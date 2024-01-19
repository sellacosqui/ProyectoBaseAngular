using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Requisito
    {
        [Key]
        public int Id { get; set; }	
		public int Proyecto_ID { get; set; }
        public string Descripcion { get; set; }
        public string Clausula { get; set; }
        public int Lista_Despegable_Requisito { get; set; }
        public string Creador_Documento { get; set; }
        public DateTime? Fecha_Apertura { get; set; }
        public string? Numeral { get; set; }
        public string? Observaciones { get; set; }
        public int? Pagina { get; set; }
        public int Estado_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public string? Documento_Referencia { get; set; }
        public string? Documento { get; set; }
        public string? Controles { get; set; }
        public string? Avance { get; set; }
        public string? Responsable { get; set; }
        public string? Ejecutado { get; set; }
        public string? Medio_Veirificacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }
        public virtual Proyectos? Proyectos { get; set; }
        public virtual Lista_Despegable? Lista_Despegable{ get; set; }   
        public virtual Estado? Estado { get; set; }
    }
}
