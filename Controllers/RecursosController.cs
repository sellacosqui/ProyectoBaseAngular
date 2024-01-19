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
    public class RecursoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RecursoController> _logger;

        public RecursoController(ILogger<RecursoController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Recurso> Get()
        {
            return  _context.Recurso.Include(f=>f.Estado).Include(f=>f.Lista_Despegable).ToList();

        }
        [HttpGet]
        [Route("Tipo")]
        public IEnumerable<Recurso> Tipo(int tipo)
        {
            return _context.Recurso.Where(f=>f.Lista_Despegable_Tipo == tipo).Include(f => f.Estado).Include(f => f.Lista_Despegable).ToList();

        }
        [HttpPost]
        public bool Post([FromBody] Recurso Recurso)
        {
            try
            {
                Recurso.Estado_Id = 1;
                _context.Recurso.Add(Recurso);
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
        public Recurso detalle(int id)
        {
            try
            {

                return _context.Recurso.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Recurso();
            }
        }
        [HttpPut]
        public bool put([FromBody] Recurso Recurso)
        {
            try
            {
                Recurso.Lista_Despegable = null;
                _context.Recurso.Update(Recurso);
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
                Recurso Recurso = _context.Recurso.Where(f => f.Id == id).FirstOrDefault();
                if (Recurso != null)
                {
                    _context.Recurso.Remove(Recurso);
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