using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Intervalo_Acividad
    {
        [Key]
        public int Id { get; set; }
		public int Actividad_Proyecto_Id { get; set; }
		public DateTime Fecha_Inicio { get; set; }
		public DateTime Fecha_Fin { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }

        public virtual Actividades_Proyecto? Actividades_Proyecto { get; set; }
    }
}
