using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Requisitos_Proyecto_Entregables
    {
        [Key]
        public int Id { get; set; }
        public int Requisito_Id { get; set; }
        public int Entregable_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }


        public virtual Requisito? Requisito { get; set; }
        public virtual EDT? EDT { get; set; }

    }
}
