using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMP.Models
{
    public class Rol
    {
        [Key]
        public int Id { get; set; }
		public string Nombre { get; set; }
		public int Estado_Id { get; set; }
		public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }
        public int Tipo_Rol { get; set; }

        public virtual Estado? Estado { get; set; }
        public virtual Lista_Despegable? Lista_Despegable { get; set; }
    }
}
