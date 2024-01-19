using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Rol_Permiso
    {
        [Key]
        public int Id { get; set; }
		public int Rol_Id { get; set; }
		public int Permiso_Id { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }

        public virtual Rol? Rol { get; set; }
        public virtual Permiso? Permiso { get; set; }
    }
}
