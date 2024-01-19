using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Recurso_Proyecto
    {
        [Key]
        public int Id { get; set; }
        public int Proyecto_ID { get; set; }
        public int Recurso_ID { get; set; }
        public string Cantidad { get; set; }
        public string Costo_Mensual { get; set; }
        public int Estado_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }

        public virtual Proyectos? Proyectos { get; set; }
        public virtual Estado? Estado { get; set; } 
        public virtual Recurso? Recurso { get; set; }
    }
}
