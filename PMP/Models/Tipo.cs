using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMP.Models
{
    public class Tipo
    {
        [Key]
        public int Id { get; set; }

		public string Nombre { get; set; }
		public int Estado_Id { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }

		//public virtual Estado? Estado { get; set; }
	}
}
