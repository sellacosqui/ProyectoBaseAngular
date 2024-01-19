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
    public class UsuarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UsuarioController> _logger;

        public UsuarioController(ILogger<UsuarioController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            return  _context.Usuario.Include(f=>f.Estado).Include(f=>f.Cliente).ToList();
        }
      
        [HttpPost]
        public bool Post([FromBody] Usuario Usuario)
        {
            try
            {
                Usuario.Estado_Id = 1;
                _context.Usuario.Add(Usuario);
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
        public Usuario detalle(int id)
        {
            try
            {

                return _context.Usuario.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Usuario();
            }
        }
        [HttpPut]
        public bool put([FromBody] Usuario Usuario)
        {
            try
            {
                _context.Usuario.Update(Usuario);
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
                Usuario Usuario = _context.Usuario.Where(f => f.Id == id).FirstOrDefault();
                if (Usuario != null)
                {
                    _context.Usuario.Remove(Usuario);
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