using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PMP.Models
{
    public class Comunicaciones
    {
        [Key]
		public int Id { get; set; }
        public string Proceso { get; set; }
		public int Tipo_Comunicacion { get; set; }

        public string Que { get; set; }
        public string Emisor { get; set; }
        public string? Receptor { get; set; }
        public string? Como { get; set; }
        public string? Cuando { get; set; }
        public string? Registro { get; set; }
        public string? Caracteristica { get; set; }
        public string? Formato { get; set; }
        public string? MecanismoVerificar { get; set; }
        public int proyecto_Id { get; set; }
        public int Usuario_Creacion { get; set; }
		public DateTime Fecha_Creacion { get; set; }


        public virtual Lista_Despegable? Lista_Despegable { get; set; }

    }
}
