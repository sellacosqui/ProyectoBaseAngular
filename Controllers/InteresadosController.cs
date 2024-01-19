using EFCore.BulkExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PMP.Data;
using PMP.Models;
using System.Collections.Generic;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class intereController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<intereController> _logger;

        public intereController(ILogger<intereController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Interesado> Get(int Proyecto_Id)
        {
            return  _context.Interesado.Where(f=>f.Proyecto_Id == Proyecto_Id).Include(f=>f.Lista_Despegable_expe).Include(f=>f.Rol_Tabla).Include(f=>f.Lista_Despegable_clasi).Include(f => f.Lista_Despegable_compro).ToList();

        }
        [HttpPost]
        [Route("Subir")]
        public IActionResult Subir(int id, IFormFile ArchivoExcel)
        {

            List<ErroresMasvo> ErroresRd = new List<ErroresMasvo>();

            Stream stream = ArchivoExcel.OpenReadStream();
            var lista_inte = _context.Interesado.Where(f => f.Proyecto_Id == id).ToList();
            var lista_ex = _context.Lista_Despegable.Where(f => f.Tipo_Id == 22).ToList();
            var lista_rol = _context.Rol.Where(f => f.Tipo_Rol == 47).ToList();
            var lista_com = _context.Lista_Despegable.Where(f => f.Tipo_Id == 16).ToList();
            var lista_cla = _context.Lista_Despegable.Where(f => f.Tipo_Id == 2).ToList();

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


            List<Interesado> interesados = new List<Interesado>();

            // Se recorren todas las filas del excel que se importa y se almacenas los datos en una Lista
            for (int i = 1; i <= cantidadFilas; i++)
            {
                IRow fila = HojaExcel.GetRow(i);
                string Fila = (fila.RowNum + 1).ToString();
                bool tipo = false;
                Interesado vali = lista_inte.Where(f=>f.Nombre == (string.IsNullOrEmpty(fila.GetCell(0).ToString()) ? null : fila.GetCell(0).ToString()) && f.Celular == (string.IsNullOrEmpty(fila.GetCell(2).ToString()) ? null : fila.GetCell(2).ToString())).FirstOrDefault();
                if (vali == null)
                {
                    try
                    {
                        Interesado inte = new Interesado();
                        inte.Proyecto_Id = id;
                        inte.Nombre = string.IsNullOrEmpty(fila.GetCell(0).ToString()) ? null : fila.GetCell(0).ToString();
                        inte.Rol = lista_rol.FirstOrDefault(f => f.Nombre == fila.GetCell(1).ToString()).Id;
                        inte.Celular = string.IsNullOrEmpty(fila.GetCell(2).ToString()) ? null : fila.GetCell(2).ToString();
                        inte.Correo = string.IsNullOrEmpty(fila.GetCell(3).ToString()) ? null : fila.GetCell(3).ToString();
                        inte.Cargo = string.IsNullOrEmpty(fila.GetCell(4).ToString()) ? null : fila.GetCell(4).ToString();
                        inte.Lista_Despegable_Clasificacion = lista_cla.FirstOrDefault(f => f.Nombre == fila.GetCell(5).ToString()).Id;
                        inte.Lista_Despegable_Compromiso = lista_com.FirstOrDefault(f => f.Nombre == fila.GetCell(6).ToString()).Id;
                        inte.Expectativas = lista_ex.FirstOrDefault(f => f.Nombre == fila.GetCell(7).ToString()).Id;
                        inte.Nivel_Apoyo = string.IsNullOrEmpty(fila.GetCell(8).ToString()) ? null : fila.GetCell(8).ToString();
                        inte.Fecha_Creacion = DateTime.Now;
                        inte.Estado_Id = 1;
                        interesados.Add(inte);
                    }
                    catch (Exception)
                    {
                        bool errorcampo_ =true;
                        try
                        {
                            int a = lista_rol.FirstOrDefault(f => f.Nombre == fila.GetCell(1).ToString()).Id;

                        }
                        catch (Exception)
                        {
                            errorcampo_ = false;
                            ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = "Rol no encontrado verificar el Nombre"});
                        }
                        try
                        {
                            int a = lista_cla.FirstOrDefault(f => f.Nombre == fila.GetCell(5).ToString()).Id;
                        }
                        catch (Exception)
                        {
                            errorcampo_ = false;
                            ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = "Clasificacion no encontrado verificar el Nombre" });
                        }
                        try
                        {
                            int a = lista_com.FirstOrDefault(f => f.Nombre == fila.GetCell(6).ToString()).Id;
                        }
                        catch (Exception)
                        {
                            errorcampo_ = false;
                            ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = "Compromiso no encontrado verificar el Nombre" });
                        }
                        try
                        {
                            int a = lista_ex.FirstOrDefault(f => f.Nombre == fila.GetCell(7).ToString()).Id;
                        }
                        catch (Exception)
                        {
                            errorcampo_ = false;
                            ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = "Expectativas no encontrada verificar el Nombre" });
                        }
                        if (errorcampo_)
                        {
                            ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = " Error de formato en alguno de los campos" });
                        }
                    }
                }
               
            }
            _context.Interesado.AddRange(interesados);
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
        public bool Post([FromBody] Interesado Interesado)
        {
            try
            {
                Interesado.Estado_Id = 1;
                _context.Interesado.Add(Interesado);
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
        public Interesado detalle(int id)
        {
            try
            {

                return _context.Interesado.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Interesado();
            }
        }
        [HttpPut]
        public bool put([FromBody] Interesado Interesado)
        {
            try
            {
                Interesado.Rol_Tabla = null;
                Interesado.Estado = null;
                Interesado.Lista_Despegable_clasi = null;
                Interesado.Lista_Despegable_compro = null;
                Interesado.Lista_Despegable_expe = null;
                _context.Interesado.Update(Interesado);
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
                Interesado Interesado = _context.Interesado.Where(f => f.Id == id).FirstOrDefault();
                if (Interesado != null)
                {
                    _context.Interesado.Remove(Interesado);
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