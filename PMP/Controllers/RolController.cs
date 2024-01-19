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
    public class RolController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RolController> _logger;

        public RolController(ILogger<RolController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

      
        [HttpGet]
        public IEnumerable<Rol> Get()
        {
            return  _context.Rol.Include(f=>f.Estado).Include(f=>f.Lista_Despegable).ToList();
        }

        [HttpGet]
        [Route("Tipo")]
        public IEnumerable<Rol> Tipo(int Tipo)
        {
            return _context.Rol.Where(f => f.Tipo_Rol == Tipo).ToList();
        }

        [HttpPost]
        public bool Post([FromBody] Rol Rol)
        {
            try
            {
                Rol.Estado = null;
                Rol.Lista_Despegable = null;
                Rol.Estado_Id = 1;
                _context.Rol.Add(Rol);
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
        public Rol detalle(int id)
        {
            try
            {

                return _context.Rol.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Rol();
            }
        }
        [HttpPut]
        public bool put([FromBody] Rol Rol)
        {
            try
            {
                Rol.Estado = null;
                Rol.Lista_Despegable = null;
                _context.Rol.Update(Rol);
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
                Rol Rol = _context.Rol.Where(f => f.Id == id).FirstOrDefault();
                if (Rol != null)
                {
                    _context.Rol.Remove(Rol);
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