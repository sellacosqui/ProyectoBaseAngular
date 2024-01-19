using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Recurso
    {
        [Key]
        public int Id { get; set; } 
        public int Lista_Despegable_Tipo { get; set; }
        public string Descripcion { get; set; }
        public int Estado_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }

        public virtual Lista_Despegable? Lista_Despegable { get; set; }
        public virtual Estado? Estado { get; set; }
    }
}
