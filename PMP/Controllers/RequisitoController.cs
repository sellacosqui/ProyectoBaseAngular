using EFCore.BulkExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PMP.Data;
using PMP.Models;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RequisitoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<RequisitoController> _logger;

        public RequisitoController(ILogger<RequisitoController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Requisito> Get(int Proyecto_ID)
        {
            return _context.Requisito.Where(f => f.Proyecto_ID == Proyecto_ID).ToList();

        }
        [HttpPost]
        [Route("Subir")]
        public IActionResult Subir(int id, int tipoid, IFormFile ArchivoExcel)
        {

            List<ErroresMasvo> ErroresRd = new List<ErroresMasvo>();

            Stream stream = ArchivoExcel.OpenReadStream();
            var lista_requisitos = _context.Requisito.Where(f => f.Proyecto_ID == id && f.Lista_Despegable_Requisito == tipoid).ToList();

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


            List<Requisito> requisitos = new List<Requisito>();

            // Se recorren todas las filas del excel que se importa y se almacenas los datos en una Lista
            for (int i = 1; i <= cantidadFilas; i++)
            {
                IRow fila = HojaExcel.GetRow(i);
                string Fila = (fila.RowNum + 1).ToString();
                bool tipo = false;
                Requisito vali = lista_requisitos.Where(f => f.Documento == (string.IsNullOrEmpty(fila.GetCell(0).ToString()) ? null : fila.GetCell(1).ToString()) && f.Clausula == (string.IsNullOrEmpty(fila.GetCell(2).ToString()) ? null : fila.GetCell(2).ToString())
                && f.Pagina == int.Parse(string.IsNullOrEmpty(fila.GetCell(0).ToString()) ? null : fila.GetCell(1).ToString()) && f.Numeral == (string.IsNullOrEmpty(fila.GetCell(2).ToString()) ? null : fila.GetCell(2).ToString())).FirstOrDefault();
                if (vali == null)
                {
                    try
                    {
                        Requisito requi = new Requisito();
                        requi.Proyecto_ID = id;
                        requi.Lista_Despegable_Requisito = tipoid;
                        requi.Creador_Documento = string.IsNullOrEmpty(fila.GetCell(0).ToString()) ? null : fila.GetCell(0).ToString();
                        requi.Documento = string.IsNullOrEmpty(fila.GetCell(1).ToString()) ? null : fila.GetCell(1).ToString();
                        requi.Clausula = string.IsNullOrEmpty(fila.GetCell(2).ToString()) ? null : fila.GetCell(2).ToString();
                        requi.Pagina = int.Parse(string.IsNullOrEmpty(fila.GetCell(3).ToString()) ? null : fila.GetCell(3).ToString());
                        requi.Numeral = string.IsNullOrEmpty(fila.GetCell(4).ToString()) ? null : fila.GetCell(4).ToString();
                        requi.Descripcion = string.IsNullOrEmpty(fila.GetCell(5).ToString()) ? null : fila.GetCell(5).ToString();
                        requi.Observaciones = string.IsNullOrEmpty(fila.GetCell(6).ToString()) ? null : fila.GetCell(6).ToString();
                        requi.Responsable = string.IsNullOrEmpty(fila.GetCell(7).ToString()) ? null : fila.GetCell(7).ToString();
                        requi.Fecha_Creacion = DateTime.Now;
                        requi.Estado_Id = 1;
                        requisitos.Add(requi);
                    }
                    catch (Exception)
                    {
                        ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = " Error de formato en alguno de los campos" });

                    }
                }

            }
            _context.Requisito.AddRange(requisitos);
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

        [HttpGet]
        [Route("detalle")]
        public List<Requisito> detalle(int id, int Tipo)
        {
            try
            {
                return _context.Requisito.Where(f => f.Proyecto_ID == id && f.Lista_Despegable_Requisito == Tipo).Include(f=>f.Lista_Despegable).ToList();
            }
            catch (Exception)
            {
                return new List<Requisito>();
            }
        }
        [HttpPost]
        public bool Post([FromBody] Requisito Requisito)
        {
            try
            {
                List<Requisito> requisitos = _context.Requisito.Where(f => f.Proyecto_ID == Requisito.Proyecto_ID).ToList();
                if (requisitos.Count() > 0)
                {
                    Requisito.Numeral = requisitos.Max(f => f.Numeral) + 1;
                    Requisito.Estado_Id = 1;
                    _context.Requisito.Add(Requisito);
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    Requisito.Numeral = "1";
                    Requisito.Estado_Id = 1;
                    _context.Requisito.Add(Requisito);
                    _context.SaveChanges();
                    return true;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpPut]
        public bool put([FromBody] Requisito Requisito)
        {
            try
            {
                _context.Requisito.Update(Requisito);
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
                Requisito Requisito = _context.Requisito.Where(f => f.Id == id).FirstOrDefault();
                if (Requisito != null)
                {
                    _context.Requisito.Remove(Requisito);
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