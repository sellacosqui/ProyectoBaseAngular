using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Estado
    {
        [Key]
        public int Id { get; set; }
		public int Tipo_Id { get; set; }
        public string Nombre { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }


        //public virtual Tipo? Tipo { get; set; }
        //public List<Actividad> Actividad { get; set; }

    }
}
