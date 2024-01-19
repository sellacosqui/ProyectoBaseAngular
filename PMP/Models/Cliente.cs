using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Cliente
    {
        [Key]
		public int Id { get; set; }
		public int Lista_Despegable_Tipo { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string? Nombre_Contacto { get; set; }
        public string? Correo_Contacto { get; set; }
        public string? Documento { get; set; }
        public string? Correo { get; set; }
        public string? Celular { get; set; }
        public int Estado_Id { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }

        public virtual Lista_Despegable? Lista_Despegable { get; set; }
        public virtual Estado? Estado { get; set; }
    }
}
