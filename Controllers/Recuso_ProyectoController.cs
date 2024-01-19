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
    public class Recurso_ProyectoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<Recurso_ProyectoController> _logger;

        public Recurso_ProyectoController(ILogger<Recurso_ProyectoController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Recurso_Proyecto> Get(int Proyecto_Id)
        {
            return  _context.Recurso_Proyecto.Where(f=>f.Proyecto_ID == Proyecto_Id).Include(f=>f.Recurso).ToList();

        }
      
        [HttpPost]
        public bool Post([FromBody] Recurso_Proyecto Recurso_Proyecto)
        {
            try
            {
                Recurso_Proyecto.Estado_Id = 1;
                _context.Recurso_Proyecto.Add(Recurso_Proyecto);
                _context.SaveChanges();


                Proyectos proyectos = _context.Proyecto.Where(f => f.Id == Recurso_Proyecto.Proyecto_ID).First();
                int presu = 0;
                    foreach (var item in _context.Recurso_Proyecto.Where(f => f.Proyecto_ID == proyectos.Id).ToList())
                    {
                        presu += int.Parse(item.Costo_Mensual);
                    }

                    //proyectos.Presupuesto = presu.ToString();

                    _context.Proyecto.Update(proyectos);
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
        public Recurso_Proyecto detalle(int id)
        {
            try
            {

                return _context.Recurso_Proyecto.Where(f=>f.Id == id).First(); 
            }
            catch (Exception)
            {
                return new Recurso_Proyecto();
            }
        }
        [HttpPut]
        public bool put([FromBody] Recurso_Proyecto Recurso_Proyecto)
        {
            try
            {
                Recurso_Proyecto.Recurso = null;
                _context.Recurso_Proyecto.Update(Recurso_Proyecto);
                _context.SaveChanges();


                Proyectos proyectos = _context.Proyecto.Where(f => f.Id == Recurso_Proyecto.Proyecto_ID).First();
                int presu = 0;
                foreach (var item in _context.Recurso_Proyecto.Where(f => f.Proyecto_ID == proyectos.Id).ToList())
                {
                    presu += int.Parse(item.Costo_Mensual);
                }

                //proyectos.Presupuesto = presu.ToString();

                _context.Proyecto.Update(proyectos);
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
                Recurso_Proyecto Recurso_Proyecto = _context.Recurso_Proyecto.Where(f => f.Id == id).FirstOrDefault();
                if (Recurso_Proyecto != null)
                {
                    _context.Recurso_Proyecto.Remove(Recurso_Proyecto);
                    _context.SaveChanges();
                    Proyectos proyectos = _context.Proyecto.Where(f => f.Id == Recurso_Proyecto.Proyecto_ID).First();
                    int presu = 0;
                    foreach (var item in _context.Recurso_Proyecto.Where(f => f.Proyecto_ID == proyectos.Id).ToList())
                    {
                        presu += int.Parse(item.Costo_Mensual);
                    }


                    //proyectos.Presupuesto = presu.ToString();

                    _context.Proyecto.Update(proyectos);
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