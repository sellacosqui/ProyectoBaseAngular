using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMP.Models
{
    public class Rol_Usuario
    {
        [Key]
        public int Id { get; set; }
		public int Usuario_Id { get; set; }
		public int Rol_Id { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }

		public virtual Usuario? Usuario { get; set; }
		public virtual Rol? Rol { get; set; }

	}
}
