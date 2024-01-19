using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMP.Data;
using PMP.Models;
using System.Collections.Generic;

namespace PMP.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class Actividad_ProyectoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<Actividad_ProyectoController> _logger;

        public Actividad_ProyectoController(ILogger<Actividad_ProyectoController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Actividades_Proyecto> Get()
        {
            try
            {
               
                    return _context.Actividades_Proyecto.ToList();
                
            }
            catch (Exception)
            {
                return new List<Actividades_Proyecto>();
                throw;
            }
        }

        [HttpPost]
        public bool Post([FromBody] Actividades_Proyecto Actividades_Proyecto)
        {
            try
            {
                    
                    List<Actividades_Proyecto> actividades = _context.Actividades_Proyecto.Where(f=>f.Proyecto_ID == Actividades_Proyecto.Proyecto_ID).ToList();
                    if (actividades.Count > 0)
                    {
                        Actividades_Proyecto.Numeral = actividades.Count + 1;
                        Actividades_Proyecto.Estado_Id = 1;
                        _context.Actividades_Proyecto.Add(Actividades_Proyecto);
                        _context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        Actividades_Proyecto.Numeral = int.Parse(  "01");
                        Actividades_Proyecto.Estado_Id = 1;
                        _context.Actividades_Proyecto.Add(Actividades_Proyecto);
                        _context.SaveChanges();
                        return true;

                    }
                    return false;
                
            }
            catch (Exception)
            {
                return false;
            }
        }
        [HttpGet]
        [Route("detalle")]
        public List<Actividades_Proyecto> detalle(int id)
        {
            try
            {


                return  _context.Actividades_Proyecto.Include(f=>f.Actividad).Where(f => f.Proyecto_ID == id).ToList(); ;
            }
            catch (Exception)
            {
                return new List<Actividades_Proyecto>();
            }

        }
        [HttpPut]
        public bool put([FromBody] Actividades_Proyecto Actividades_Proyecto)
        {
            try
            {
                _context.Actividades_Proyecto.Update(Actividades_Proyecto);
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
                Actividades_Proyecto Actividades_Proyecto = _context.Actividades_Proyecto.Where(f => f.Id == id).FirstOrDefault();
                if (Actividades_Proyecto != null)
                {
                    _context.Actividades_Proyecto.Remove(Actividades_Proyecto);
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