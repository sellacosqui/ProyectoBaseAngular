using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Riesgos_Proyecto
    {
        [Key]
        public int Id { get; set; }
		public int Riesgo_Id { get; set; }
		public int Entregable_Id { get; set; }
        public string Posible_Dueno { get; set; }
 
		public int Probabilidad { get; set; }
		public int Impacto_Tiempo { get; set; }
		public int Impacto_Costo { get; set; }
        public string Valoracion { get; set; }
		public int Probabilidad_Cuantitativa { get; set; }
		public int Impacto_Dias_Cuantitativa { get; set; }
		public int Impacto_Costos_Cuantitativa { get; set; }
		public int Tipo_respuesta { get; set; }
        public string Accion_Respuesta { get; set; }
		public int Tiempo_Respuesta { get; set; }
        public int Costo_Respuesta { get; set; }
		public int Probabilidad_Residual { get; set; }
		public int Impacto_Dias_Residual { get; set; }
		public int Impacto_Costos_Residual { get; set; }
		public int Tiempo_Reserva { get; set; }
		public int Costo_Reserva { get; set; }
        public string Acciones_Contingentes { get; set; }
		public int proyecto_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public int Severidad { get; set; }
        public DateTime Fecha_Creacion { get; set; }

        public virtual Riesgos? Riesgos { get; set; }
        public virtual EDT? EDT { get; set; }
        public virtual Proyectos? Proyectos { get; set; }
        public virtual Lista_Despegable? Lista_Despegable { get; set; }

    }
}
