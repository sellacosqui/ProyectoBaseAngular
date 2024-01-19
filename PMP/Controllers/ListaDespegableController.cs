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
    public class ListaDespegableController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ListaDespegableController> _logger;

        public ListaDespegableController(ILogger<ListaDespegableController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Lista_Despegable> Get()
        {
            return  _context.Lista_Despegable.Include(f=>f.Estado).Include(f=>f.Tipo).ToList();
        }
        [HttpGet]
        [Route("Tipos")]
        public IEnumerable<Lista_Despegable> GetTipos(int tipo)
        {
            return _context.Lista_Despegable.Where(f=>f.Tipo_Id == tipo).ToList();
        }

        [HttpPost]
        public bool Post([FromBody] Lista_Despegable Lista_Despegable)
        {
            try
            {
                Lista_Despegable.Estado_Id = 1;
                _context.Lista_Despegable.Add(Lista_Despegable);
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
        public Lista_Despegable detalle(int id)
        {
            try
            {

                return _context.Lista_Despegable.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Lista_Despegable();
            }
        }
        [HttpPut]
        public bool put([FromBody] Lista_Despegable Lista_Despegable)
        {

            try
            {
                Lista_Despegable.Estado = null;
                Lista_Despegable.Tipo = null;
                _context.Lista_Despegable.Update(Lista_Despegable);
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
                Lista_Despegable Lista_Despegable = _context.Lista_Despegable.Where(f => f.Id == id).FirstOrDefault();
                if (Lista_Despegable != null)
                {
                    _context.Lista_Despegable.Remove(Lista_Despegable);
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