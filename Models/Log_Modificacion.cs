using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Log_Modificacion
    {
        [Key]
		public int Id { get; set; }
        public string Tabla { get; set; }
		public int Usuario_ID { get; set; }
		public DateTime Fecha { get; set; }
        public string Texto { get; set; }
    }
}
