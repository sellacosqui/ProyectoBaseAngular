using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMP.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

		public string usuario { get; set; }
		public string Pass { get; set; }

		public string Nombre { get; set; }
		public string Apellidos { get; set; }
		public string Email { get; set; }
		public string Documento { get; set; }
		public int Estado_Id { get; set; }
		public int Cliente_Id { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }
		
		public virtual Estado? Estado { get; set; }
		public virtual Cliente? Cliente { get; set; }

	}
}
