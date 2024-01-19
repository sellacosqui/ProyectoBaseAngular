using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Riesgos
    {
        [Key]
        public int Id { get; set; }
		public int Estado_Id { get; set; }
        public string Nombre { get; set; }
        public string Causa { get; set; }
        public string Consecuencia { get; set; }
        public string? Codigo { get; set; }
        public string? Descripcion { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }

        public virtual Estado? Estado { get; set; }

    }
}
