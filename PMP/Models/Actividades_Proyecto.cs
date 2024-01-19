using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Actividades_Proyecto
    {
        [Key]
        public int Id { get; set; }
        public DateTime Fecha_Inicial { get; set; }
        public DateTime Fecha_Final { get; set; }
        public int Proyecto_ID { get; set; }
        public int Actividad_Id { get; set; }
        public string Duracion { get; set; }
        public DateTime Fecha_Entrega { get; set; }
        public int Numeral { get; set; }
        public int Estado_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }


        public virtual Proyectos? Proyectos { get; set; }
        public virtual Actividad? Actividad { get; set; }

    }
}
