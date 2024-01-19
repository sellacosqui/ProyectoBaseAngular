using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using PMP.Models;
using System.Reflection.Emit;
using System.Xml.Linq;

namespace PMP.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }
        public DbSet<PMP.Models.Actividad> Actividad { get; set; }
        public DbSet<PMP.Models.Actividades_Proyecto> Actividades_Proyecto { get; set; }
        public DbSet<PMP.Models.Actividades_Proyecto_Entregables> Actividades_Proyecto_Entregables { get; set; }
        public DbSet<PMP.Models.Cliente> Cliente { get; set; }
        public DbSet<PMP.Models.Comunicaciones> Comunicaciones { get; set; }
        public DbSet<PMP.Models.EDT> EDT { get; set; }
        public DbSet<PMP.Models.Estado> Estado { get; set; }
        public DbSet<PMP.Models.Interesado> Interesado { get; set; }
        public DbSet<PMP.Models.Intervalo_Acividad> Intervalo_Acividad { get; set; }
        public DbSet<PMP.Models.Lista_Despegable> Lista_Despegable { get; set; }
        public DbSet<PMP.Models.Log_Modificacion> Log_Modificacion { get; set; }
        public DbSet<PMP.Models.Permiso> Permiso { get; set; }
        public DbSet<PMP.Models.Proyectos> Proyecto { get; set; }
        public DbSet<PMP.Models.Recurso> Recurso { get; set; }
        public DbSet<PMP.Models.Recurso_Proyecto> Recurso_Proyecto { get; set; }
        public DbSet<PMP.Models.Requisito> Requisito { get; set; }
        public DbSet<PMP.Models.Requisitos_Proyecto_Entregables> Requisitos_Proyecto_Entregables { get; set; }
        public DbSet<PMP.Models.Riesgos> Riesgos { get; set; }
        public DbSet<PMP.Models.Riesgos_Proyecto> Riesgos_Proyecto { get; set; }
        public DbSet<PMP.Models.Rol> Rol { get; set; }
        public DbSet<PMP.Models.Rol_Permiso> Rol_Permiso { get; set; }
        public DbSet<PMP.Models.Rol_Usuario> Rol_Usuario { get; set; }
        public DbSet<PMP.Models.Tipo> Tipo { get; set; }
        public DbSet<PMP.Models.Usuario> Usuario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region keys
            // se crean llaves primarias en las clases para poder realizar consultas entre tablas con Include linq
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Actividad>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Actividades_Proyecto>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Actividades_Proyecto_Entregables>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Cliente>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Comunicaciones>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<EDT>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Estado>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Interesado>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Intervalo_Acividad>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Lista_Despegable>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Log_Modificacion>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Permiso>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Proyectos>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Recurso>()
                .HasKey(x => x.Id);
            modelBuilder.Entity<Recurso_Proyecto>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Requisito>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Requisitos_Proyecto_Entregables>()
              .HasKey(x => x.Id);
            modelBuilder.Entity<Riesgos>()
             .HasKey(x => x.Id);
            modelBuilder.Entity<Riesgos_Proyecto>()
           .HasKey(x => x.Id);
            modelBuilder.Entity<Rol>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Rol_Permiso>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Rol_Usuario>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Tipo>()
               .HasKey(x => x.Id);
            modelBuilder.Entity<Usuario>()
            .HasKey(x => x.Id);
            #endregion

            #region conexion de llaves foraneas tabla de actividad
            modelBuilder.Entity<Actividad>()
           .HasOne(p => p.Estado)
           .WithMany()
           .HasForeignKey(b => b.Estado_Id);
            modelBuilder.Entity<Actividad>()
            .HasOne(p => p.Lista_Despegable)
            .WithMany()
            .HasForeignKey(p => p.Lista_Despegable_Actividad);
            #endregion

            #region conexion de llaves foraneas tabla de Actividades_Proyecto
            modelBuilder.Entity<Actividades_Proyecto>()
           .HasOne(p => p.Proyectos)
           .WithMany()
           .HasForeignKey(b => b.Proyecto_ID);
            modelBuilder.Entity<Actividades_Proyecto>()
            .HasOne(p => p.Actividad)
            .WithMany()
            .HasForeignKey(p => p.Actividad_Id);
           
            #endregion

            #region conexion de llaves foraneas tabla de Actividades_Proyecto_entregables
            modelBuilder.Entity<Actividades_Proyecto_Entregables>()
           .HasOne(p => p.EDT)
           .WithMany()
           .HasForeignKey(b => b.Entregable_Id);
            modelBuilder.Entity<Actividades_Proyecto_Entregables>()
            .HasOne(p => p.Actividad)
            .WithMany()
            .HasForeignKey(p => p.Actividad_Id);
      
            #endregion

            #region conexion de llaves foraneas tabla de Cliente
            modelBuilder.Entity<Cliente>()
          .HasOne(p => p.Lista_Despegable)
          .WithMany()
          .HasForeignKey(b => b.Lista_Despegable_Tipo);
            modelBuilder.Entity<Cliente>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Comunicaciones
            modelBuilder.Entity<Comunicaciones>()
          .HasOne(p => p.Lista_Despegable)
          .WithMany()
          .HasForeignKey(b => b.Tipo_Comunicacion);
            #endregion

            #region conexion de llaves foraneas tabla de EDT
            modelBuilder.Entity<EDT>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<EDT>()
            .HasOne(p => p.Proyectos)
            .WithMany()
            .HasForeignKey(p => p.Proyecto_Id);
            modelBuilder.Entity<EDT>()
           .HasOne(p => p.Lista_Despegable_tipo)
           .WithMany()
           .HasForeignKey(p => p.Tipo_Entregable);
            #endregion

            #region conexion de llaves foraneas tabla de Interesado
            modelBuilder.Entity<Interesado>()
              .HasOne(p => p.Lista_Despegable_clasi)
              .WithMany()
              .HasForeignKey(b => b.Lista_Despegable_Clasificacion);
            modelBuilder.Entity<Interesado>()
             .HasOne(p => p.Lista_Despegable_compro)
             .WithMany()
             .HasForeignKey(b => b.Lista_Despegable_Compromiso);
            modelBuilder.Entity<Interesado>()
             .HasOne(p => p.Lista_Despegable_expe)
             .WithMany()
             .HasForeignKey(b => b.Expectativas);
            modelBuilder.Entity<Interesado>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<Interesado>()
            .HasOne(p => p.Proyectos)
            .WithMany()
            .HasForeignKey(p => p.Proyecto_Id);
            modelBuilder.Entity<Interesado>()
          .HasOne(p => p.Rol_Tabla)
          .WithMany()
          .HasForeignKey(p => p.Rol);
            #endregion

            #region conexion de llaves foraneas tabla de Intervalo_Acividad
            modelBuilder.Entity<Intervalo_Acividad>()
              .HasOne(p => p.Actividades_Proyecto)
              .WithMany()
              .HasForeignKey(b => b.Actividad_Proyecto_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Lista_Despegable
            modelBuilder.Entity<Lista_Despegable>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<Lista_Despegable>()
            .HasOne(p => p.Tipo)
            .WithMany()
            .HasForeignKey(p => p.Tipo_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Permiso
            modelBuilder.Entity<Permiso>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Proyectos
            modelBuilder.Entity<Proyectos>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<Proyectos>()
           .HasOne(p => p.Cliente)
           .WithMany()
           .HasForeignKey(p => p.Cliente_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Recurso
            modelBuilder.Entity<Recurso>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<Recurso>()
           .HasOne(p => p.Lista_Despegable)
           .WithMany()
           .HasForeignKey(p => p.Lista_Despegable_Tipo);
            #endregion

            #region conexion de llaves foraneas tabla de Recurso_Proyecto
            modelBuilder.Entity<Recurso_Proyecto>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<Recurso_Proyecto>()
           .HasOne(p => p.Recurso)
           .WithMany()
           .HasForeignKey(p => p.Recurso_ID);
            modelBuilder.Entity<Recurso_Proyecto>()
          .HasOne(p => p.Proyectos)
          .WithMany()
          .HasForeignKey(p => p.Proyecto_ID);
            #endregion

            #region conexion de llaves foraneas tabla de Requisito
            modelBuilder.Entity<Requisito>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<Requisito>()
           .HasOne(p => p.Proyectos)
           .WithMany()
           .HasForeignKey(p => p.Proyecto_ID);
            modelBuilder.Entity<Requisito>()
          .HasOne(p => p.Lista_Despegable)
          .WithMany()
          .HasForeignKey(p => p.Lista_Despegable_Requisito);
            #endregion

            #region conexion de llaves foraneas tabla de Requisito_Proyecto_entregables
            modelBuilder.Entity<Requisitos_Proyecto_Entregables>()
           .HasOne(p => p.Requisito)
           .WithMany()
           .HasForeignKey(b => b.Requisito_Id);
            modelBuilder.Entity<Requisitos_Proyecto_Entregables>()
            .HasOne(p => p.EDT)
            .WithMany()
            .HasForeignKey(p => p.Entregable_Id);

            #endregion

            #region conexion de llaves foraneas tabla de riesgos
            modelBuilder.Entity<Riesgos>()
           .HasOne(p => p.Estado)
           .WithMany()
           .HasForeignKey(b => b.Estado_Id);

            #endregion

            #region conexion de llaves foraneas tabla de riesgos_Proyecto
            modelBuilder.Entity<Riesgos_Proyecto>()
            .HasOne(p => p.Riesgos)
            .WithMany()
            .HasForeignKey(b => b.Riesgo_Id);
            modelBuilder.Entity<Riesgos_Proyecto>()
            .HasOne(p => p.EDT)
            .WithMany()
            .HasForeignKey(b => b.Entregable_Id);
            modelBuilder.Entity<Riesgos_Proyecto>()
            .HasOne(p => p.Proyectos)
            .WithMany()
            .HasForeignKey(b => b.proyecto_Id);
            modelBuilder.Entity<Riesgos_Proyecto>()
           .HasOne(p => p.Lista_Despegable)
           .WithMany()
           .HasForeignKey(b => b.Tipo_respuesta);
            #endregion

            #region conexion de llaves foraneas tabla de Rol
            modelBuilder.Entity<Rol>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);

            modelBuilder.Entity<Rol>()
           .HasOne(p => p.Lista_Despegable)
           .WithMany()
           .HasForeignKey(p => p.Tipo_Rol);
            #endregion

            #region conexion de llaves foraneas tabla de Rol_Permiso
            modelBuilder.Entity<Rol_Permiso>()
            .HasOne(p => p.Rol)
            .WithMany()
            .HasForeignKey(p => p.Rol_Id);
            modelBuilder.Entity<Rol_Permiso>()
           .HasOne(p => p.Permiso)
           .WithMany()
           .HasForeignKey(p => p.Permiso_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Rol_Usuario
            modelBuilder.Entity<Rol_Usuario>()
            .HasOne(p => p.Usuario)
            .WithMany()
            .HasForeignKey(p => p.Usuario_Id);
            modelBuilder.Entity<Rol_Usuario>()
           .HasOne(p => p.Rol)
           .WithMany()
           .HasForeignKey(p => p.Rol_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Tipo
            //modelBuilder.Entity<Tipo>()
            //.HasOne(p => p.Estado)
            //.WithMany()
            //.HasForeignKey(p => p.Estado_Id);
            #endregion

            #region conexion de llaves foraneas tabla de Usuario
            modelBuilder.Entity<Usuario>()
            .HasOne(p => p.Estado)
            .WithMany()
            .HasForeignKey(p => p.Estado_Id);
            modelBuilder.Entity<Usuario>()
           .HasOne(p => p.Cliente)
           .WithMany()
           .HasForeignKey(p => p.Cliente_Id);
            #endregion
        }

    }

}