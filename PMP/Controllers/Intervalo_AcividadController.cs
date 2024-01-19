using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMP.Data;
using PMP.Models;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class Intervalo_AcividadController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<Intervalo_AcividadController> _logger;

        public Intervalo_AcividadController(ILogger<Intervalo_AcividadController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Intervalo_Acividad> Get(int Actividad_Id)
        {
          
            return _context.Intervalo_Acividad.Where(f=>f.Actividad_Proyecto_Id == Actividad_Id).Include(f=>f.Actividades_Proyecto).ToList();
        }
      
        [HttpPost]
        public bool Post([FromBody] Intervalo_Acividad Intervalo_Acividad)
        {
            try
            {
                _context.Intervalo_Acividad.Add(Intervalo_Acividad);
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
        public Intervalo_Acividad detalle(int id)
        {
            try
            {

                return _context.Intervalo_Acividad.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Intervalo_Acividad();
            }
        }
        [HttpPut]
        public bool put([FromBody] Intervalo_Acividad Intervalo_Acividad)
        {
            try
            {
                Intervalo_Acividad.Actividades_Proyecto = null;
                _context.Intervalo_Acividad.Update(Intervalo_Acividad);
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
                Intervalo_Acividad Intervalo_Acividad = _context.Intervalo_Acividad.Where(f => f.Id == id).FirstOrDefault();
                if (Intervalo_Acividad != null)
                {
                    _context.Intervalo_Acividad.Remove(Intervalo_Acividad);
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