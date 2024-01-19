using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class EDT
    {
        [Key]
        public int Id { get; set; }
        public string Nombre_Cuenta { get; set; }
        public string Descripcion_Cuenta { get; set; }
        public DateTime Fecha_Entrega { get; set; }
        public string? Margen_demora { get; set; }
        public int Numeral { get; set; }
        public int Estado_Id { get; set; }
        public int? Tipo_Entregable { get; set; }
        public int Proyecto_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }

        public virtual Estado? Estado { get; set; }
        public virtual Proyectos? Proyectos { get; set; }
        public virtual Lista_Despegable? Lista_Despegable_tipo { get; set; }
    }
}
