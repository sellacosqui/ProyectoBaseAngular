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
    public class TipoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TipoController> _logger;

        public TipoController(ILogger<TipoController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Tipo> Get()
        {
            return  _context.Tipo.Where(f=>f.Estado_Id == 1).ToList();
        }
      
        [HttpPost]
        public bool Post([FromBody] Tipo Tipo)
        {
            try
            {
                Tipo.Estado_Id = 1;
                _context.Tipo.Add(Tipo);
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
        public Tipo detalle(int id)
        {
            try
            {

                return _context.Tipo.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Tipo();
            }
        }
        [HttpPut]
        public bool put([FromBody] Tipo Tipo)
        {
            try
            {
                _context.Tipo.Update(Tipo);
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
                Tipo Tipo = _context.Tipo.Where(f => f.Id == id).FirstOrDefault();
                if (Tipo != null)
                {
                    _context.Tipo.Remove(Tipo);
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