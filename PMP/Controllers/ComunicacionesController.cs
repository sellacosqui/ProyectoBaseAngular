using EFCore.BulkExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PMP.Data;
using PMP.Models;
using System.Reflection.PortableExecutable;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ComunicacionesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ComunicacionesController> _logger;

        public ComunicacionesController(ILogger<ComunicacionesController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Comunicaciones> Get(int Proyecto_Id)
        {
            return _context.Comunicaciones.Where(f => f.proyecto_Id == Proyecto_Id).Include(f => f.Lista_Despegable).ToList();
        }

        [HttpPost]
        [Route("Subir")]
        public IActionResult Subir(int id,IFormFile ArchivoExcel)
        {

            List<ErroresMasvo> ErroresRd = new List<ErroresMasvo>();

            Stream stream = ArchivoExcel.OpenReadStream();
            var lista = _context.Lista_Despegable.Where(f => f.Tipo_Id == 23).ToList();

            IWorkbook MiExcel = null;

            if (Path.GetExtension(ArchivoExcel.FileName) == ".xlsx")
            {
                MiExcel = new XSSFWorkbook(stream);
            }
            else
            {
                MiExcel = new HSSFWorkbook(stream);
            }

            ISheet HojaExcel = MiExcel.GetSheetAt(0);

            int cantidadFilas = HojaExcel.LastRowNum;


            List<Comunicaciones> comunicaciones = new List<Comunicaciones>();

            // Se recorren todas las filas del excel que se importa y se almacenas los datos en una Lista
            for (int i = 1; i <= cantidadFilas; i++)
            {
                IRow fila = HojaExcel.GetRow(i);
                string Fila = (fila.RowNum + 1).ToString();
                bool tipo = false;

                //Agregar radicados
                try
                {
                    Comunicaciones como = new Comunicaciones();
                    como.proyecto_Id = id;
                    como.Proceso = string.IsNullOrEmpty(fila.GetCell(0).ToString()) ? null : fila.GetCell(0).ToString();
                    como.Que = string.IsNullOrEmpty(fila.GetCell(1).ToString()) ? null : fila.GetCell(1).ToString();
                    como.Tipo_Comunicacion = lista.FirstOrDefault(f => f.Nombre == fila.GetCell(2).ToString()).Id;
                    como.Emisor = string.IsNullOrEmpty(fila.GetCell(3).ToString()) ? null : fila.GetCell(3).ToString();
                    como.Receptor = string.IsNullOrEmpty(fila.GetCell(4).ToString()) ? null : fila.GetCell(4).ToString();
                    como.Como = string.IsNullOrEmpty(fila.GetCell(5).ToString()) ? null : fila.GetCell(5).ToString();
                    como.Formato = string.IsNullOrEmpty(fila.GetCell(6).ToString()) ? null : fila.GetCell(6).ToString();
                    como.Caracteristica = string.IsNullOrEmpty(fila.GetCell(7).ToString()) ? null : fila.GetCell(7).ToString();
                    como.Cuando = string.IsNullOrEmpty(fila.GetCell(8).ToString()) ? null : fila.GetCell(8).ToString();
                    como.MecanismoVerificar = string.IsNullOrEmpty(fila.GetCell(9).ToString()) ? null : fila.GetCell(9).ToString();
                    como.Registro = string.IsNullOrEmpty(fila.GetCell(10).ToString()) ? null : fila.GetCell(10).ToString();
                    como.Fecha_Creacion = DateTime.Now;
                    comunicaciones.Add(como); 
                }
                catch (Exception)
                {
                    try
                    {
                       int a = lista.FirstOrDefault(f => f.Nombre == fila.GetCell(2).ToString()).Id;
                        ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = " Error de formato en alguno de los campos" });
                    }
                    catch (Exception)
                    {
                        ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = "Tipo de Comunicacón verificar el Nombre" });
                    }
                }
            }
            _context.Comunicaciones.AddRange(comunicaciones);
            _context.SaveChanges();
            if (ErroresRd.Count == 0)
            {

                bool error = false;

                return StatusCode(StatusCodes.Status200OK, new { error = error, mensaje = "Se carga correctamente, No se encontraron errores." });
            }
            else
            {
                bool error = true;
                return Ok(new { error = error, data = ErroresRd.ToList(), mensaje = "carga correctamente la informacion que no tenia errores." });
            }
        }
        [HttpPost]
        public bool Post([FromBody] Comunicaciones Comunicaciones)
        {
            try
            {
                _context.Comunicaciones.Add(Comunicaciones);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpPost]
        [Route("detalle")]
        public Comunicaciones detalle(int id)
        {
            try
            {

                return _context.Comunicaciones.Where(f => f.Id == id).First();
            }
            catch (Exception)
            {
                return new Comunicaciones();
            }
        }
        [HttpPut]
        public bool put([FromBody] Comunicaciones Comunicaciones)
        {
            try
            {
                Comunicaciones.Lista_Despegable = null;
                _context.Comunicaciones.Update(Comunicaciones);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpDelete]
        public bool delete(int id)
        {
            try
            {
                Comunicaciones Comunicaciones = _context.Comunicaciones.Where(f => f.Id == id).FirstOrDefault();
                if (Comunicaciones != null)
                {
                    _context.Comunicaciones.Remove(Comunicaciones);
                    _context.SaveChanges();
                    return true;

                }
                else
                    return false;

            }
            catch (Exception)
            {
                return false;
            }
        }
    
    }

}