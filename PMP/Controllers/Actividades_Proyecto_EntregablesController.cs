using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMP.Data;
using PMP.Models;
using System.Linq;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class Actividades_Proyecto_EntregablesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<Actividades_Proyecto_EntregablesController> _logger;

        public Actividades_Proyecto_EntregablesController(ILogger<Actividades_Proyecto_EntregablesController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<EDT> Get(int Actividad_Id)
        {
           
             List < int > a = _context.Actividades_Proyecto_Entregables.Where(f=>f.Actividad_Id == Actividad_Id).Include(f => f.EDT).Include(f => f.EDT).Select(f=>f.EDT.Id).ToList();
            return _context.EDT.Where(f => a.Contains(f.Id)).ToList();
        }
      
        [HttpPost]
        public bool Post([FromBody] Actividades_Proyecto_Entregables Actividades_Proyecto_Entregables)
        {
            try
            {
                Actividades_Proyecto_Entregables a = _context.Actividades_Proyecto_Entregables.Where(f => f.Actividad_Id == Actividades_Proyecto_Entregables.Actividad_Id && f.Entregable_Id == Actividades_Proyecto_Entregables.Entregable_Id).FirstOrDefault();  
                if (a == null)
                {
                    _context.Actividades_Proyecto_Entregables.Add(Actividades_Proyecto_Entregables);
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
        [HttpGet]
        [Route("detalle")]
        public Actividades_Proyecto_Entregables detalle(int id)
        {
            try
            {

                return _context.Actividades_Proyecto_Entregables.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Actividades_Proyecto_Entregables();
            }
        }
        [HttpPut]
        public bool put([FromBody] Actividades_Proyecto_Entregables Actividades_Proyecto_Entregables)
        {
            try
            {
                Actividades_Proyecto_Entregables.EDT = null;
                Actividades_Proyecto_Entregables.Actividad = null;
                _context.Actividades_Proyecto_Entregables.Update(Actividades_Proyecto_Entregables);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpDelete]
        public bool delete(int id ,int Entre_id)
        {
            try
            {
                Actividades_Proyecto_Entregables Actividades_Proyecto_Entregables = _context.Actividades_Proyecto_Entregables.Where(f => f.Actividad_Id == id && f.Entregable_Id == Entre_id).FirstOrDefault();
                if (Actividades_Proyecto_Entregables != null)
                {
                    _context.Actividades_Proyecto_Entregables.Remove(Actividades_Proyecto_Entregables);
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