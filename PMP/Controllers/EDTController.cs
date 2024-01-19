using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PMP.Data;
using PMP.Models;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EDTController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<EDTController> _logger;

        public EDTController(ILogger<EDTController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<EDT> Get(int Proyecto_Id)
        {
            return _context.EDT.Where(f => f.Proyecto_Id == Proyecto_Id).ToList();

        }

        [HttpPost]
        public bool Post([FromBody] EDT EDT)
        {
            try
            {
                EDT.Lista_Despegable_tipo = null;
                EDT.Estado = null;
                List<EDT> eDTs = _context.EDT.Where(f => f.Proyecto_Id == EDT.Proyecto_Id).ToList();
                if (eDTs.Count() > 0)
                {
                    EDT.Numeral = eDTs.Max(f => f.Numeral) + 1;
                    EDT.Estado_Id = 1;
                    _context.EDT.Add(EDT);
                    _context.SaveChanges();
                    return true;
                }
                else
                {

                    EDT.Numeral = int.Parse("01");
                    EDT.Estado_Id = 1;
                    _context.EDT.Add(EDT);
                    _context.SaveChanges();
                    return true;


                }

            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpPost]
        [Route("detalle")]
        public EDT detalle(int id)
        {
            try
            {

                return _context.EDT.Where(f => f.Id == id).First();
            }
            catch (Exception)
            {
                return new EDT();
            }
        }
        [HttpPut]
        public bool put([FromBody] EDT EDT)
        {
            try
            {
                EDT.Lista_Despegable_tipo = null;
                EDT.Estado = null;
                _context.EDT.Update(EDT);
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
                EDT EDT = _context.EDT.Where(f => f.Id == id).FirstOrDefault();
                if (EDT != null)
                {
                    _context.EDT.Remove(EDT);
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