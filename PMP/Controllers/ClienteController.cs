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
    public class ClienteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ClienteController> _logger;

        public ClienteController(ILogger<ClienteController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Cliente> Get()
        {
            return  _context.Cliente.Include(f=>f.Estado).ToList();
        }
      
        [HttpPost]
        public bool Post([FromBody] Cliente Cliente)
        {
            try
            {
                Cliente.Estado_Id = 1;
                _context.Cliente.Add(Cliente);
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
        public Cliente detalle(int id)
        {
            try
            {

                return _context.Cliente.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Cliente();
            }
        }
        [HttpPut]
        public bool put([FromBody] Cliente Cliente)
        {
            try
            {
                _context.Cliente.Update(Cliente);
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
                Cliente Cliente = _context.Cliente.Where(f => f.Id == id).FirstOrDefault();
                if (Cliente != null)
                {
                    _context.Cliente.Remove(Cliente);
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