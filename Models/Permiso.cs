using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Permiso
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string metodo { get; set; }
        public string Texto { get; set; }
        public int Estado_Id { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }

        public virtual Estado? Estado { get; set; }
    }
}
