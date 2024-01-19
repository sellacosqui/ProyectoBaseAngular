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
    public class ActividadController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<ActividadController> _logger;

        public ActividadController(ILogger<ActividadController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Actividad> Get()
        {
          
            return _context.Actividad.Include(f=>f.Estado).Include(f=>f.Lista_Despegable).ToList();
        }
      
        [HttpPost]
        public bool Post([FromBody] Actividad Actividad)
        {
            try
            {
                Actividad.Estado_Id = 1;
                _context.Actividad.Add(Actividad);
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
        public Actividad detalle(int id)
        {
            try
            {

                return _context.Actividad.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Actividad();
            }
        }
        [HttpPut]
        public bool put([FromBody] Actividad Actividad)
        {
            try
            {
                Actividad.Lista_Despegable = null;
                _context.Actividad.Update(Actividad);
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
                Actividad Actividad = _context.Actividad.Where(f => f.Id == id).FirstOrDefault();
                if (Actividad != null)
                {
                    _context.Actividad.Remove(Actividad);
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