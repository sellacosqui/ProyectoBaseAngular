using System.ComponentModel.DataAnnotations;

namespace PMP.Models
{
    public class Interesado
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string? Celular { get; set; }
        public string? Correo { get; set; }
        public int Lista_Despegable_Clasificacion { get; set; }
        public int Lista_Despegable_Compromiso { get; set; }
        public string? Cargo { get; set; }
        public int? Rol { get; set; }
        public int? Expectativas { get; set; }
        public string Nivel_Apoyo { get; set; }
        public bool Masivo { get; set; }
        public int Estado_Id { get; set; }
        public int Proyecto_Id { get; set; }
        public int Usuario_Creacion { get; set; }
        public DateTime Fecha_Creacion { get; set; }

        public virtual Lista_Despegable? Lista_Despegable_clasi { get; set; }
        public virtual Lista_Despegable? Lista_Despegable_compro { get; set; }
        public virtual Lista_Despegable? Lista_Despegable_expe { get; set; }
        public virtual Estado? Estado { get; set; }
        public virtual Proyectos? Proyectos { get; set; }
        public virtual Rol? Rol_Tabla { get; set; }

    }
}
