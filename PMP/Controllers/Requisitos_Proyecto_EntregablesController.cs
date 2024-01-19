using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMP.Data;
using PMP.Models;
using System.Linq;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class Requisitos_Proyecto_EntregablesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<Requisitos_Proyecto_EntregablesController> _logger;

        public Requisitos_Proyecto_EntregablesController(ILogger<Requisitos_Proyecto_EntregablesController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Requisito> Get(int Entregable_Id)
        {
           
             List < int > a = _context.Requisitos_Proyecto_Entregables.Where(f=>f.Entregable_Id == Entregable_Id).Include(f => f.EDT).Include(f => f.Requisito).Select(f=>f.Requisito.Id).ToList();
            return _context.Requisito.Where(f => a.Contains(f.Id)).ToList();
        }
      
        [HttpPost]
        public bool Post([FromBody] Requisitos_Proyecto_Entregables Requisitos_Proyecto_Entregables)
        {
            try
            {
                Requisitos_Proyecto_Entregables a = _context.Requisitos_Proyecto_Entregables.Where(f => f.Requisito_Id == Requisitos_Proyecto_Entregables.Requisito_Id && f.Entregable_Id == Requisitos_Proyecto_Entregables.Entregable_Id).FirstOrDefault();  
                if (a == null)
                {
                    _context.Requisitos_Proyecto_Entregables.Add(Requisitos_Proyecto_Entregables);
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
        [HttpGet]
        [Route("detalle")]
        public Requisitos_Proyecto_Entregables detalle(int id)
        {
            try
            {

                return _context.Requisitos_Proyecto_Entregables.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Requisitos_Proyecto_Entregables();
            }
        }
        [HttpPut]
        public bool put([FromBody] Requisitos_Proyecto_Entregables Requisitos_Proyecto_Entregables)
        {
            try
            {
                Requisitos_Proyecto_Entregables.EDT = null;
                Requisitos_Proyecto_Entregables.Requisito = null;
                _context.Requisitos_Proyecto_Entregables.Update(Requisitos_Proyecto_Entregables);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpDelete]
        public bool delete(int id ,int Entre_id)
        {
            try
            {
                Requisitos_Proyecto_Entregables Requisitos_Proyecto_Entregables = _context.Requisitos_Proyecto_Entregables.Where(f => f.Requisito_Id == id && f.Entregable_Id == Entre_id).FirstOrDefault();
                if (Requisitos_Proyecto_Entregables != null)
                {
                    _context.Requisitos_Proyecto_Entregables.Remove(Requisitos_Proyecto_Entregables);
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