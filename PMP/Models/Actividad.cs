using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PMP.Models
{
    public class Actividad
    {
        [Key]
		public int Id { get; set; }
		public int Lista_Despegable_Actividad { get; set; }
        
        public string Nombre { get; set; }
        public int Estado_Id { get; set; }
        public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }


        public virtual Lista_Despegable? Lista_Despegable { get; set; }
        public virtual Estado? Estado { get; set; }

    }
}
