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
    public class ProyectController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProyectController> _logger;

        public ProyectController(ILogger<ProyectController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Proyectos> Get()
        {
            return  _context.Proyecto.Include(f=>f.Cliente).Include(f=>f.Estado).ToList();

        }
      
        [HttpPost]
        public bool Post([FromBody] Proyectos proyecto)
        {
            try
            {
                proyecto.Estado = null;
                proyecto.Estado_Id = 1;
                _context.Proyecto.Add(proyecto);
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
        public Proyectos detalle(int id)
        {
            try
            {

                return _context.Proyecto.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Proyectos();
            }
        }
        [HttpPut]
        public bool put([FromBody] Proyectos proyecto)
        {
            try
            {
                _context.Proyecto.Update(proyecto);
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
                Proyectos proyecto = _context.Proyecto.Where(f => f.Id == id).FirstOrDefault();
                if (proyecto != null)
                {
                    _context.Proyecto.Remove(proyecto);
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