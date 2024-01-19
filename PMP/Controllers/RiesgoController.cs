using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PMP.Data;
using PMP.Models;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RiesgoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RiesgoController> _logger;

        public RiesgoController(ILogger<RiesgoController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Riesgos> Get()
        {
            return _context.Riesgos.Include(f => f.Estado).ToList();
        }

        

        [HttpPost]
        public bool Post([FromBody] Riesgos Riesgo)
        {
            try
            {
                Riesgo.Estado_Id = 1;
                _context.Riesgos.Add(Riesgo);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpGet]
        [Route("detalle")]
        public Riesgos detalle(int id)
        {
            try
            {

                return _context.Riesgos.Where(f => f.Id == id).First();
            }
            catch (Exception)
            {
                return new Riesgos();
            }
        }
        [HttpPut]
        public bool put([FromBody] Riesgos Riesgo)
        {
            try
            {
                Riesgo.Estado = null;
                _context.Riesgos.Update(Riesgo);
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
                Riesgos Riesgo = _context.Riesgos.Where(f => f.Id == id).FirstOrDefault();
                if (Riesgo != null)
                {
                    _context.Riesgos.Remove(Riesgo);
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