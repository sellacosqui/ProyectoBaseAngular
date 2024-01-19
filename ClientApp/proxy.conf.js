const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:64193';

const PROXY_CONFIG = [
  {
    context: [
      "/proyect",
      "/Login",
      "/EDT",
      "/Intervalo_Acividad",
      "/Actividades_Proyecto_Entregables",
      "/Requisitos_Proyecto_Entregables",
      "/Requisito",
      "/Actividad",
      "/Riesgo",
      "/Actividad_Proyecto",
      "/Recurso_Proyecto",
      "/Recurso",
      "/Rol",
      "/ListaDespegable",
      "/Tipo",
      "/Cliente",
      "/Comunicaciones",
      "/intere",
      "/_configuration",
      "/.well-known",
      "/RiesgoProyecto",
      "/Identity",
      "/connect",
      "/ApplyDatabaseMigrations",
      "/_framework"
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;