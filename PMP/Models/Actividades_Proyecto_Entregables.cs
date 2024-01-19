using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Actividades_Proyecto_Entregables
    {
        [Key]
        public int Id { get; set; }
        public int Entregable_Id { get; set; }
        public int Actividad_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }


        public virtual EDT? EDT { get; set; }
        public virtual Actividad? Actividad { get; set; }

    }
}
