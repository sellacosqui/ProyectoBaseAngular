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
    public class RiesgoProyectoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RiesgoProyectoController> _logger;

        public RiesgoProyectoController(ILogger<RiesgoProyectoController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Riesgos_Proyecto> Get(int Proyecto_Id)
        {
            return  _context.Riesgos_Proyecto.Where(f => f.proyecto_Id == Proyecto_Id).Include(f=>f.EDT).Include(f=>f.Riesgos).Include(f=>f.Lista_Despegable).ToList();
        }


        [HttpPost]
        [Route("Subir")]
        public IActionResult Subir(int id, IFormFile ArchivoExcel)
        {

            List<ErroresMasvo> ErroresRd = new List<ErroresMasvo>();

            Stream stream = ArchivoExcel.OpenReadStream();
            var riegos_pro = _context.Riesgos_Proyecto.Where(f => f.proyecto_Id == id).ToList();
            var lista_riesgos = _context.Riesgos.ToList();
            var lista_entregable = _context.EDT.Where(f => f.Proyecto_Id == id).ToList();
            var lista_des = _context.Lista_Despegable.Where(f => f.Tipo_Id == 26).ToList();

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


            List<Riesgos_Proyecto> riesgos_Proyecto = new List<Riesgos_Proyecto>();

            // Se recorren todas las filas del excel que se importa y se almacenas los datos en una Lista
            for (int i = 1; i <= cantidadFilas; i++)
            {
                try
                {
                    IRow fila = HojaExcel.GetRow(i);
                    string Fila = (fila.RowNum + 1).ToString();
                    bool tipo = false;
                    Riesgos_Proyecto riesgos1 = riegos_pro.Where(f=> f.Riesgo_Id == int.Parse(fila.GetCell(0).ToString()) && f.Entregable_Id == int.Parse(fila.GetCell(1).ToString())).FirstOrDefault(); 

                    if (riesgos1== null)
                    {
                        try
                        {
                            Riesgos_Proyecto riesgos = new Riesgos_Proyecto();
                            riesgos.proyecto_Id = id;
                            riesgos.Riesgo_Id = lista_riesgos.FirstOrDefault(f => f.Codigo == (fila.GetCell(0).ToString())).Id;
                            riesgos.Entregable_Id = lista_entregable.FirstOrDefault(f => f.Id == int.Parse(fila.GetCell(1).ToString())).Id;
                            riesgos.Posible_Dueno = string.IsNullOrEmpty(fila.GetCell(2).ToString()) ? null : fila.GetCell(2).ToString();
                            riesgos.Probabilidad = int.Parse(string.IsNullOrEmpty(fila.GetCell(3).ToString()) ? null : fila.GetCell(3).ToString());
                            riesgos.Impacto_Tiempo = int.Parse(string.IsNullOrEmpty(fila.GetCell(4).ToString()) ? null : fila.GetCell(4).ToString());
                            riesgos.Impacto_Costo = int.Parse(string.IsNullOrEmpty(fila.GetCell(5).ToString()) ? null : fila.GetCell(5).ToString());
                            riesgos.Probabilidad_Cuantitativa = int.Parse(string.IsNullOrEmpty(fila.GetCell(6).ToString()) ? null : fila.GetCell(6).ToString());
                            riesgos.Impacto_Dias_Cuantitativa = int.Parse(string.IsNullOrEmpty(fila.GetCell(7).ToString()) ? null : fila.GetCell(7).ToString());
                            riesgos.Impacto_Costos_Cuantitativa = int.Parse(string.IsNullOrEmpty(fila.GetCell(8).ToString()) ? null : fila.GetCell(8).ToString());
                            riesgos.Tipo_respuesta = lista_des.FirstOrDefault(f => f.Nombre == fila.GetCell(9).ToString()).Id;
                            riesgos.Accion_Respuesta = string.IsNullOrEmpty(fila.GetCell(10).ToString()) ? null : fila.GetCell(10).ToString();
                            riesgos.Tiempo_Respuesta = int.Parse(string.IsNullOrEmpty(fila.GetCell(11).ToString()) ? null : fila.GetCell(11).ToString());
                            riesgos.Costo_Respuesta = int.Parse(string.IsNullOrEmpty(fila.GetCell(12).ToString()) ? null : fila.GetCell(12).ToString());
                            riesgos.Probabilidad_Residual = int.Parse(string.IsNullOrEmpty(fila.GetCell(13).ToString()) ? null : fila.GetCell(13).ToString());
                            riesgos.Impacto_Dias_Residual = int.Parse(string.IsNullOrEmpty(fila.GetCell(14).ToString()) ? null : fila.GetCell(14).ToString());
                            riesgos.Impacto_Costos_Residual = int.Parse(string.IsNullOrEmpty(fila.GetCell(15).ToString()) ? null : fila.GetCell(15).ToString());
                            riesgos.Acciones_Contingentes = string.IsNullOrEmpty(fila.GetCell(16).ToString()) ? null : fila.GetCell(16).ToString();
                            //calculados
                            ;
                            riesgos.Tiempo_Reserva = riesgos.Probabilidad_Residual * riesgos.Impacto_Dias_Residual;
                            riesgos.Costo_Reserva = riesgos.Probabilidad_Residual * riesgos.Impacto_Costos_Residual;

                            int resultado = 0;

                            if (riesgos.Impacto_Tiempo > riesgos.Impacto_Costo)
                            {
                                resultado = riesgos.Probabilidad * riesgos.Impacto_Tiempo;
                            }
                            else
                            {
                                resultado = riesgos.Probabilidad * riesgos.Impacto_Costo;
                            }

                            riesgos.Severidad = resultado;

                            if (resultado < 4)
                                riesgos.Valoracion = "Bajo";
                            else if (resultado < 7)
                                riesgos.Valoracion = "Medio";
                            else
                                riesgos.Valoracion = "Alto";

                            riesgos.Entregable_Id = lista_entregable.FirstOrDefault(f => f.Id == int.Parse(fila.GetCell(1).ToString())).Id;
                            riesgos.Fecha_Creacion = DateTime.Now;
                            riesgos_Proyecto.Add(riesgos);
                        }
                        catch (Exception)
                        {
                            ErroresRd.Add(new ErroresMasvo { Fila = int.Parse(Fila), Error = " Error de formato en alguno de los campos" });

                        }
                    }
                    
                }
                catch (Exception)
                {

                    //throw;
                }
               
                
            }
            _context.Riesgos_Proyecto.AddRange(riesgos_Proyecto);
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
        public bool Post([FromBody] Riesgos_Proyecto RiesgoProyecto)
        {
            try
            {
                _context.Riesgos_Proyecto.Add(RiesgoProyecto);
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
        public Riesgos_Proyecto detalle(int id)
        {
            try
            {

                return _context.Riesgos_Proyecto.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Riesgos_Proyecto();
            }
        }
        [HttpPut]
        public bool put([FromBody] Riesgos_Proyecto RiesgoProyecto)
        {
            try
            {
                RiesgoProyecto.Riesgos = null;
                RiesgoProyecto.EDT = null;
                RiesgoProyecto.Lista_Despegable = null;
                _context.Riesgos_Proyecto.Update(RiesgoProyecto);
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
                Riesgos_Proyecto RiesgoProyecto = _context.Riesgos_Proyecto.Where(f => f.Id == id).FirstOrDefault();
                if (RiesgoProyecto != null)
                {
                    _context.Riesgos_Proyecto.Remove(RiesgoProyecto);
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