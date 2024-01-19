using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Proyectos
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Nombre_Diminutivo { get; set; }
        public string Descripccion { get; set; }
        public int Cliente_Id { get; set; }
        public string Gerente_Proyecto { get; set; }
        public string Presupuesto { get; set; }
        public string Contrato { get; set; }
        public DateTime Fecha_Inicio { get; set; }
        public DateTime Fecha_Fin { get; set; }
        public string Duracion { get; set; }
        public int Estado_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }

        public virtual Estado? Estado { get; set; }
        public virtual Cliente? Cliente { get; set; }
    }
}
