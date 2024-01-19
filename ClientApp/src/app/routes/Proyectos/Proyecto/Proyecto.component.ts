import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, EnvironmentInjector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { MtxGridColumn, MtxGridColumnButton } from '@ng-matero/extensions/grid';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { debug } from 'util';
import { Rol } from '../../Roles/Roles.component';
import { resolveCname } from 'dns';
import * as fileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-forms-dynamic',
  templateUrl: './Proyecto.component.html',
  styleUrls: ['./Proyecto.component.scss'],
})
export class ProyectoComponent implements OnInit {
  public listRecursos_Proyecto: any[] = [];
  public listRiesgos_Proyecto: any[] = [];
  public listComunicaciones: any[] = [];
  public list: any[] = [];
  public listEDT: any[] = [];
  public listRequisitos: any[] = [];
  public listRequisitosContractuales: any[] = [];
  public listRequisitosTecnicos: any[] = [];
  public listActividades: any[] = [];
  public listActividades_Proyecto: any[] = [];
  public id = 0;
  public Interesados: Interesado = {
    id: 0,
    nombre: '',
    celular: '',
    correo: '',
    lista_Despegable_Clasificacion: 0,
    lista_Despegable_Compromiso: 0,
    cargo: '',
    rol: 0,
    expectativas: 0,
    nivel_Apoyo: '',
    masivo: false,
    estado_Id: 0,
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  public Riesgo_Proyectos: Riesgo_Proyecto = {
    id: 0,
    riesgo_Id: 0,
    entregable_Id: 0,
    posible_Dueno: '',
    probabilidad: 0,
    impacto_Tiempo: 0,
    impacto_Costo: 0,
    valoracion: '',
    probabilidad_Cuantitativa: 0,
    impacto_Dias_Cuantitativa: 0,
    impacto_Costos_Cuantitativa: 0,
    tipo_respuesta: 0,
    accion_Respuesta: '',
    tiempo_Respuesta: 0,
    costo_Respuesta: 0,
    probabilidad_Residual: 0,
    impacto_Dias_Residual: 0,
    impacto_Costos_Residual: 0,
    tiempo_Reserva: 0,
    costo_Reserva: 0,
    severidad: 0,
    acciones_Contingentes: '',
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }
  public Comunicacions: Comunicacion = {
    id: 0,
    proceso: '',
    tipo_Comunicacion: 0,
    que: '',
    emisor: '',
    receptor: '',
    como: '',
    cuando: '',
    caracteristica: '',
    formato: '',
    mecanismoVerificar: '',
    registro: '',
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }
  public Actividades_Proyecto: Actividades_Proyecto = {
    id: 0,
    fecha_Inicial: new Date(),
    fecha_Final: new Date(),
    proyecto_ID: 0,
    actividad_Id: 0,
    requisito_Id: 0,
    duracion: '',
    fecha_Entrega: new Date(),
    numeral: 0,
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  }
  public EDTs: EDT = {
    id: 0,
    numeral: 0,
    nombre_Cuenta: '',
    tipo_Entregable: 0,
    descripcion_Cuenta: '',
    fecha_Entrega: new Date(),
    margen_demora: '',
    estado_Id: 0,
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  public EDTselect: EDT = {
    id: 0,
    numeral: 0,
    tipo_Entregable: 0,
    nombre_Cuenta: '',
    descripcion_Cuenta: '',
    fecha_Entrega: new Date(),
    margen_demora: '',
    estado_Id: 0,
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  public Requisitos: Requisito = {
    id: 0,
    proyecto_ID: 0,
    descripcion: '',
    creador_Documento: '',
    lista_Despegable_Requisito: 0,
    clausula: '',
    fecha_Apertura: new Date(),
    numeral: 0,
    observaciones: '',
    pagina: 0,
    estado_Id: 0,
    documento: '',
    responsable: '',
    usuario_Creacion: 0,
    documento_Referencia: '',
    fecha_Creacion: new Date(),
  };
  public RequisitosSelect: Requisito = {
    id: 0,
    proyecto_ID: 0,
    descripcion: '',
    creador_Documento: '',
    lista_Despegable_Requisito: 0,
    clausula: '',
    fecha_Apertura: new Date(),
    numeral: 0,
    observaciones: '',
    pagina: 0,
    estado_Id: 0,
    usuario_Creacion: 0,
    documento: '',
    responsable: '',
    documento_Referencia: '',
    fecha_Creacion: new Date(),
  };
  public Actividades: Actividad = {
    id: 0,
    lista_Despegable_Actividad: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  };
  public ActividadesSelect: Actividad = {
    id: 0,
    lista_Despegable_Actividad: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  };
  public proyectos: proyecto = {
    id: 0,
    nombre: '',
    nombre_Diminutivo: '',
    descripccion: '',
    cliente_Id: 0,
    gerente_Proyecto: '',
    presupuesto: '',
    contrato: '',
    fecha_Inicio: new Date(),
    fecha_Fin: new Date(),
    duracion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date()
  };
  public Recursos_Proyecto: Recursos_Proyecto = {
    id: 0,
    proyecto_ID: 0,
    recurso_ID: 0,
    cantidad: '',
    costo_Mensual: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  public Recursos_ProyectoSelect: Recursos_Proyecto = {
    id: 0,
    proyecto_ID: 0,
    recurso_ID: 0,
    cantidad: '',
    costo_Mensual: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  Recursos_ProyectoColumns: MtxGridColumn[] = [
    {
      header: 'Recurso',
      field: 'recurso.descripcion',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Cantidad',
      field: 'cantidad',
      minWidth: 100,
    },
    {
      header: 'Costo Mensual',
      field: 'costo_Mensual',
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openRecursoDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarRecurso(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openRecursoDialogData(record),
        },
      ],
    }
  ];
  columnsRequisitosVista: MtxGridColumn[] = [

    {
      header: 'Documento',
      field: 'documento',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Clausula',
      field: 'clausula',
      minWidth: 100,
    },
    {
      header: 'Pagina',
      field: 'pagina',
      minWidth: 120,
      width: '120px',
    },
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Descripcion',
      field: 'descripcion',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Creador de Documento',
      field: 'creador_Documento',
      minWidth: 100,
    },
    {
      header: 'Observaciones',
      field: 'observaciones',
      hide: true,
      minWidth: 120,
    },

    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openRequisitoDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarRequisito(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openRequisitoDialogData(record),
        },
      ],
    }
  ];
  columns: MtxGridColumn[] = [
    {
      header: 'Nombre',
      field: 'nombre',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Celular',
      field: 'celular',
      minWidth: 100,
    },
    {
      header: 'Correo',
      field: 'correo',
      minWidth: 100,
    },
    {
      header: 'Cargo',
      field: 'cargo',
      minWidth: 100,
    },
    {
      header: 'Rol',
      field: 'rol',
      hide: true,
      minWidth: 120,
    },
    {
      header: 'Expectativas',
      field: 'lista_Despegable_expe.nombre',
      minWidth: 120,
      width: '120px',
    },
    {
      header: 'Nivel Apoyo',
      field: 'nivel_Apoyo',
      minWidth: 180,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openInteresadoDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminar(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openInteresadoDialogData(record),
        },
      ],
    }
  ];
  columnsEDT: MtxGridColumn[] = [
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Nombre Cuenta',
      field: 'nombre_Cuenta',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openEDTDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarEDT(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openEDTDialogData(record),
        },
      ],
    }
  ];
  columnsRequisitos: MtxGridColumn[] = [
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      width: '50',
    },
    {
      header: 'Descripcion de Requisito',
      field: 'descripcion',
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openRequisitoDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarRequisito(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openRequisitoDialogData(record),
        },
      ],
    }
  ];
  columnsActividades_Proyecto: MtxGridColumn[] = [
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      width: '50',
    },
    {
      header: 'Nombre actividad',
      field: 'actividad.nombre',
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openActividad_ProyectoDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarActividadesProyecto(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openActividad_ProyectoDialogData(record),
        },
      ],
    }
  ];
  columnsActividades: MtxGridColumn[] = [
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Nombre actividad',
      field: 'actividad.nombre',
      minWidth: 100,
    },
    {
      header: 'Fecha Inicial',
      field: 'fecha_Inicial',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Fecha Final',
      field: 'fecha_Final',
      minWidth: 100,
    },
    {
      header: 'Duracion',
      field: 'duracion',
      minWidth: 100,
    },
    {
      header: 'fecha de Entrega',
      field: 'fecha_Entrega',
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openActividad_ProyectoDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarActividadesProyecto(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openActividad_ProyectoDialogData(record),
        },
      ],
    }

  ];
  columnsComunicaciones: MtxGridColumn[] = [
    {
      header: 'Proceso',
      field: 'proceso',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Tipo Comunicacion',
      field: 'lista_Despegable.nombre',
      minWidth: 100,
    },
    {
      header: 'Que',
      field: 'que',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Emisor',
      field: 'emisor',
      minWidth: 100,
    },
    {
      header: 'Receptor',
      field: 'receptor',
      minWidth: 100,
    },
    {
      header: 'Como',
      field: 'como',
      minWidth: 100,
    },
    {
      header: 'Cuando',
      field: 'cuando',
      minWidth: 100,
    },
    {
      header: 'Registro',
      field: 'registro',
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openComunicacionDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarComunicacion(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openComunicacionDialogData(record),
        },
      ],
    }
  ];
  columnsRiesgos_Proyecto: MtxGridColumn[] = [
    {
      header: 'Riesgo',
      field: 'riesgos.nombre',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Descripcíon',
      field: 'riesgos.descripcion',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Causa',
      field: 'riesgos.causa',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Consecuencia',
      field: 'riesgos.consecuencia',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Entregable',
      field: 'edt.nombre_Cuenta',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Posible Dueño',
      field: 'posible_Dueno',
      minWidth: 100,
    },
    {
      header: 'Probabilidad',
      field: 'probabilidad',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Impacto Tiempo',
      field: 'impacto_Tiempo',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Impacto Costo',
      field: 'impacto_Costo',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Severidad',
      field: 'severidad',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Valoracion',
      field: 'valoracion',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Probabilidad Cuantitativa',
      field: 'probabilidad_Cuantitativa',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Impacto Dias Cuantitativa',
      field: 'impacto_Dias_Cuantitativa',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Impacto Costos Cuantitativa',
      field: 'impacto_Costos_Cuantitativa',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Tipo respuesta',
      field: 'tipo_respuesta',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Accion Respuesta',
      field: 'accion_Respuesta',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Tiempo Respuesta',
      field: 'tiempo_Respuesta',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Costo Respuesta',
      field: 'costo_Respuesta',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Probabilidad Residual',
      field: 'probabilidad_Residual',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Impacto Dias Residual',
      field: 'impacto_Dias_Residual',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Impacto Costos Residual',
      field: 'impacto_Costos_Residual',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Tiempo Reserva',
      field: 'tiempo_Reserva',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Costo Reserva',
      field: 'costo_Reserva',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Acciones Contingentes',
      field: 'acciones_Contingentes',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openRiesgoDialogDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarRiesgo(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openRiesgoDialogDialogData(record),
        },
      ],
    }
  ];
  columnsRequisitos_entreables: MtxGridColumn[] = [
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      width: '50',
    },
    {
      header: 'Nombre actividad',
      field: 'actividad.nombre',
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.openActividad_ProyectoDialogData(record),
        },
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarActividadesProyecto(record),
        },
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openActividad_ProyectoDialogData(record),
        },
      ],
    }
  ];


  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  baseUrl = '';

  constructor(private toast: ToastrService, public http: HttpClient,
    private snackBar: MatSnackBar, private route: Router, private roueteacti: ActivatedRoute, public dialog: MatDialog) {
    console.log(this.roueteacti.snapshot.paramMap.get('id'));
    if (this.roueteacti.snapshot.paramMap.get('id') != null) {
      this.id = Number(this.roueteacti.snapshot.paramMap.get('id')?.toString());
    }
  }

  public exportComu() {

    const Comunicacionex: Comunicacionexp[] = [];

    for (let numero of this.listComunicaciones) {
      debugger
      const a: Comunicacionexp = {
        Proceso: numero.proceso,
        Tipo_Comunicacion: numero.lista_Despegable.nombre,
        Que: numero.que,
        Emisor: numero.emisor,
        Receptor: numero.receptor,
        Como: numero.como,
        Cuando: numero.cuando,
        Registro: numero.registro,
        Proyecto: this.proyectos.nombre,
        Caracteristica: numero.caracteristica,
        Formato: numero.formato,
        MecanismoVerificar: numero.mecanismoVerificar
      }
      Comunicacionex.push(a);
    }

    this.exportAsExcelFile(Comunicacionex, 'Comunicaciones')
  }

  public exportInte() {

    const Comunicacionex: Interesadoexp[] = [];

    for (let numero of this.list) {
      debugger
      const a: Interesadoexp = {
        Nombre: numero.nombre,
        Celular: numero.celular,
        Correo: numero.correo,
        Clasificacion: numero.lista_Despegable_clasi.nombre,
        Compromiso: numero.lista_Despegable_compro.nombre,
        Cargo: numero.cargo,
        Rol: numero.rol_Tabla.nombre,
        Expectativas: numero.lista_Despegable_expe.nombre,
        Nivel_Apoyo: numero.nivel_Apoyo,
        Proyecto: this.proyectos.nombre,
      }
      Comunicacionex.push(a);
    }

    this.exportAsExcelFile(Comunicacionex, 'Interesados')
  }
  
  public exportRequiTecnicos() {

    const Comunicacionex: Requisitoexp[] = [];

    for (let numero of this.listRequisitosTecnicos) {
      debugger
      const a: Requisitoexp = {
        Proyecto: this.proyectos.nombre,
        Descripcion: numero.descripcion,
        Requisito: numero.lista_Despegable.descripcion,
        Creador_Documento: numero.creador_Documento,
        Clausula: numero.clausula,
        Numeral: numero.numeral,
        Observaciones: numero.observaciones,
        Pagina: numero.pagina,
        Documento: numero.documento,
        Responsable: numero.responsable,
      }
      Comunicacionex.push(a);
    }

    this.exportAsExcelFile(Comunicacionex, 'RequisitosTecnicos')
  }

  public exportRequiContra() {

    const Comunicacionex: Requisitoexp[] = [];

    for (let numero of this.listRequisitosContractuales) {
      debugger
      const a: Requisitoexp = {
        Proyecto: this.proyectos.nombre,
        Descripcion: numero.descripcion,
        Requisito: numero.lista_Despegable.descripcion,
        Creador_Documento: numero.creador_Documento,
        Clausula: numero.clausula,
        Numeral: numero.numeral,
        Observaciones: numero.observaciones,
        Pagina: numero.pagina,
        Documento: numero.documento,
        Responsable: numero.responsable,
      }
      Comunicacionex.push(a);
    }

    this.exportAsExcelFile(Comunicacionex, 'RequisitosContractuales')
  }

  public exportRiesgos() {

    const Comunicacionex: Riesgoexp[] = [];

    for (let numero of this.listRiesgos_Proyecto) {
      debugger
      const a: Riesgoexp = {
        Nombre: numero.riesgos.nombre,
        Causa: numero.riesgos.causa,
        Consecuencia: numero.riesgos.consecuencia,
        Descripcion: numero.riesgos.descripcion,
        Codigo: numero.codigo,
        Entregable: numero.edt.numeral,
        Posible_Dueno: numero.posible_Dueno,
        Probabilidad_Cualitativo: numero.probabilidad,
        Impacto_Tiempo_Cualitativo: numero.impacto_Tiempo,
        Impacto_Costo_Cualitativo: numero.impacto_Costo,
        Severidad: numero.severidad,
        Valoracion: numero.valoracion,
        Probabilidad_Cuantitativa: numero.probabilidad_Cuantitativa,
        Ïmpacto_Dias_Cuantitativa: numero.impacto_Dias_Cuantitativa,
        Impacto_Costos_Cuantitativa: numero.impacto_Costos_Cuantitativa,
        Respuesta: numero.lista_Despegable.nombre,
        Accion_Respuesta: numero.accion_Respuesta,
        Tiempo_Respuesta: numero.tiempo_Respuesta,
        Costo_Respuesta: numero.costo_Respuesta,
        Probabilidad_Residual: numero.probabilidad_Residual,
        Impacto_Dias_Residual: numero.impacto_Dias_Residual,
        Impacto_Costos_Residual: numero.impacto_Costos_Residual,
        Tiempo_Reserva: numero.tiempo_Reserva,
        Costo_Reserva: numero.costo_Reserva,
        Acciones_Contingentes: numero.acciones_Contingentes,
        Proyecto: this.proyectos.nombre,
      }
      Comunicacionex.push(a);
    }

    this.exportAsExcelFile(Comunicacionex, 'Riesgos')
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
  }

  ngOnInit() {
    if (this.id != 0) {
      this.http.get<Interesado[]>('/intere?Proyecto_Id=' + this.id).subscribe(result => {
        this.getdatatable(result)
      }, error => console.error(error));
      this.http.post<proyecto>('/proyect/detalle?id=' + this.id, String).subscribe(result => {
        console.log(result);
        this.proyectos = result;
      }, error => console.error(error));
    }
    else {
      this.route.navigate(['../Proyectos/list']);

    }
  }
  TabsIndex(index: number) {
    console.log(index);
    if (index == 0) {
      this.InteresadosList()
    }
    else if (index == 3) {
      this.EDTList();
    }
    else if (index == 1) {
      this.listRequisitosContractualesget();
    }
    else if (index == 2) {
      this.listRequisitosTecnicosget();
    }
    else if (index == 4) {
      this.listActividad_Proyectoget();
    }
    else if (index == 5) {
      this.listRecursos_Proyectoget();
    }
    else if (index == 6) {
      this.ComunicacionList();
    }
    else if (index == 7) {
      this.RiesgoProyectoList();
    }
  }
  InteresadosList() {
    this.http.get<Requisito[]>('/Requisito?Proyecto_ID=' + this.id).subscribe(result => {
      this.isLoading = true;
      this.getdatatableRequisitos(result);
    }, error => console.error(error));

  }
  EDTList() {
    this.isLoading = true;
    this.http.get<EDT[]>('/EDT?Proyecto_Id=' + this.id).subscribe(result => {
      console.log(result);
      this.getdatatableEDT(result);
    }, error => console.error(error));

  }
  ComunicacionList() {
    this.isLoading = true;
    this.http.get<Comunicacion[]>('/Comunicaciones?Proyecto_Id=' + this.id).subscribe(result => {
      console.log(result);
      this.getdatatableComunicaciones(result);
    }, error => console.error(error));

  }
  RiesgoProyectoList() {
    this.isLoading = true;
    this.http.get<Riesgo_Proyecto[]>('/RiesgoProyecto?Proyecto_Id=' + this.id).subscribe(result => {
      console.log(result);
      this.getdatatableRiesgoProyecto(result);
    }, error => console.error(error));

  }
  listRequisitosContractualesget() {
    this.isLoading = true;
    this.http.get<Requisito[]>('/Requisito/detalle?id=' + this.id + '&Tipo=29').subscribe(result => {
      console.log(result);
      this.getdatatableRequisitosContractuales(result);
    }, error => console.error(error));
  }
  listActividad_Proyectoget() {
    this.isLoading = true;
    this.http.get<Actividades_Proyecto[]>('/Actividad_Proyecto/detalle?id=' + this.id).subscribe(result => {
      console.log(result);
      this.getdatatableActividadesVista(result);
    }, error => console.error(error));
  }
  listRequisitosTecnicosget() {
    this.isLoading = true;
    this.http.get<Requisito[]>('/Requisito/detalle?id=' + this.id + '&Tipo=30').subscribe(result => {
      console.log(result);
      this.getdatatableRequisitosTecnicos(result);
    }, error => console.error(error));
  }
  listRecursos_Proyectoget() {
    this.isLoading = true;
    this.http.get<Recursos_Proyecto[]>('/Recurso_Proyecto?Proyecto_Id=' + this.id).subscribe(result => {
      console.log(result);
      this.getdatatablelistRecursos_Proyecto(result);
    }, error => console.error(error));
  }
  RequisitosList() {
    this.isLoading = true;
    this.http.get<Interesado[]>('/Requisito?Proyecto_ID=' + this.id).subscribe(result => {
      this.listRequisitos = result;
      this.isLoading = false;
    }, error => console.error(error));
  }
  Actividades_proyectoList(data: EDT) {
    this.isLoading = true;
    if (this.RequisitosSelect.id > 0) {
      this.http.get<Actividades_Proyecto[]>('/Actividad_Proyecto?EDT_id=' + this.EDTselect.id + '&Requisito_Id=' + this.RequisitosSelect.id).subscribe(result => {
        this.listActividades_Proyecto = result;
        this.isLoading = false;
      }, error => console.error(error));
    } else {
      this.http.get<Actividades_Proyecto[]>('/Actividad_Proyecto?EDT_id=' + data.id).subscribe(result => {
        this.listActividades_Proyecto = result;
        this.isLoading = false;
      }, error => console.error(error));
    }

  }
  Actividades_proyectoListRefres(data: EDT) {
    this.isLoading = true;
    this.http.get<Actividades_Proyecto[]>('/Actividad_Proyecto?EDT_id=' + data.id).subscribe(result => {
      this.listActividades_Proyecto = result;
      this.isLoading = false;
    }, error => console.error(error));
  }
  InteresadosListRefres() {
    this.isLoading = true;
    this.http.get<Interesado[]>('/intere?Proyecto_Id=' + this.id).subscribe(result => {
      this.list = result;
      this.isLoading = false;
    }, error => console.error(error));

  }
  EDTListRefres() {
    this.isLoading = true;
    this.http.get<EDT[]>('/EDT?Proyecto_Id=' + this.id).subscribe(result => {
      this.listEDT = result;
      this.isLoading = false;
    }, error => console.error(error));

  }
  RequisitosListRefres(data: Requisito) {
    this.isLoading = true;
    this.http.get<Requisito[]>('/Requisito?Proyecto_Id=' + data.proyecto_ID).subscribe(result => {
      this.getdatatableRequisitos(result);
    }, error => console.error(error));
  }
  changeSelectRequisito(e: any) {
    debugger
    this.RequisitosSelect = e[0];
  }
  changeSelectEDT(e: any) {
    this.EDTselect = e[0];
    this.Actividades_proyectoList(e[0]);
  }
  cancelar() {
    this.route.navigate(['../Proyectos/list']);
  }
  getdatatableEDT(data: EDT[]) {
    this.listEDT = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatableComunicaciones(data: Comunicacion[]) {
    this.listComunicaciones = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatableRiesgoProyecto(data: Riesgo_Proyecto[]) {
    this.listRiesgos_Proyecto = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatablelistRecursos_Proyecto(data: Recursos_Proyecto[]) {
    this.listRecursos_Proyecto = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatableRequisitosContractuales(data: Requisito[]) {
    this.listRequisitosContractuales = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatableRequisitosTecnicos(data: Requisito[]) {
    this.listRequisitosTecnicos = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatableActividadesVista(data: Actividades_Proyecto[]) {
    this.listActividades = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatableRequisitos(data: Requisito[]) {
    this.listRequisitos = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  getdatatable(data: Interesado[]) {
    this.list = data;
    this.isLoading = false;
    this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });
  }
  showToast(obj: proyecto) {
    this.toast.success(JSON.stringify(obj));
  }
  eliminar(datos: Interesado) {
    this.http.delete<Interesado[]>('/intere?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.InteresadosListRefres();
      }
      else {
      };
    }, error => console.error(error));

  }
  eliminarEDT(datos: EDT) {
    this.http.delete<EDT[]>('/EDT?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.EDTListRefres();
      }
      else {
      };
    }, error => console.error(error));

  }
  eliminarRecurso(datos: Recursos_Proyecto) {
    this.http.delete<Recursos_Proyecto[]>('/Recurso_Proyecto?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.listRecursos_Proyectoget();
      }
      else {
      };
    }, error => console.error(error));

  }
  eliminarActividadesProyecto(datos: Actividades_Proyecto) {
    this.http.delete<Actividades_Proyecto[]>('/Actividad_Proyecto?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.listActividad_Proyectoget();
      }
      else {
      };
    }, error => console.error(error));

  }
  eliminarRequisito(datos: Requisito) {
    this.http.delete<Requisito[]>('/Requisito?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.listRequisitosTecnicosget();
        this.listRequisitosContractualesget();
      }
      else {
      };
    }, error => console.error(error));

  }
  eliminarActividades_Proyecto(datos: Actividades_Proyecto) {
    this.http.delete<Actividades_Proyecto[]>('/Actividad_Proyecto?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.Actividades_proyectoList(this.EDTselect);
      }
      else {
      };
    }, error => console.error(error));

  }
  openInteresadoDialog() {
    this.Interesados.proyecto_Id = this.id;
    const dialogoInteresados = this.dialog.open(DialogInteresadosFormComponent, { data: this.Interesados });
    dialogoInteresados.beforeClosed().subscribe(result => {
      this.InteresadosListRefres();
    })
  }
  openInteresadoDialogData(data: EDT) {
    const dialogoInteresados = this.dialog.open(DialogInteresadosFormComponent, { data: data });
    dialogoInteresados.beforeClosed().subscribe(result => {
      this.InteresadosListRefres();
    })
  }
  openActividad_ProyectoDialog() {

    this.Actividades_Proyecto.requisito_Id = this.RequisitosSelect.id;
    const dialogoEDT = this.dialog.open(DialogActividadesFormComponent, { data: { data: this.Actividades_Proyecto, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listActividad_Proyectoget();
    })


  }
  openActividad_ProyectoDialogData(data: Actividades_Proyecto) {
    const dialogoEDT = this.dialog.open(DialogActividadesFormComponent, { data: { data: data, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listActividad_Proyectoget();
    })
  }
  openRecursoDialog() {
    this.Recursos_Proyecto.proyecto_ID = this.id;
    const dialogoEDT = this.dialog.open(DialogRecursos_ProyectosFormComponent, { data: this.Recursos_Proyecto });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listRecursos_Proyectoget();
      this.http.post<proyecto>('/proyect/detalle?id=' + this.id, String).subscribe(result => {
        console.log(result);
        this.proyectos = result;
      }, error => console.error(error));
    })
  }
  openRecursoDialogData(data: Recursos_Proyecto) {
    data.Tipo_id = data.recurso?.lista_Despegable_Tipo;
    const dialogoEDT = this.dialog.open(DialogRecursos_ProyectosFormComponent, { data: data });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listRecursos_Proyectoget();
      this.http.post<proyecto>('/proyect/detalle?id=' + this.id, String).subscribe(result => {
        console.log(result);
        this.proyectos = result;
      }, error => console.error(error));
    })
  }
  openRequisitoDialog() {
    const dialogoEDT = this.dialog.open(DialogRequsitosFormComponent, { data: { data: this.Requisitos, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listRequisitosTecnicosget();
      this.listRequisitosContractualesget();
      this.listEDT = [];
      this.listActividades_Proyecto = [];
      this.RequisitosSelect = {
        id: 0,
        proyecto_ID: 0,
        documento: '',
        responsable: '',
        descripcion: '',
        creador_Documento: '',
        lista_Despegable_Requisito: 0,
        clausula: '',
        fecha_Apertura: new Date(),
        numeral: 0,
        observaciones: '',
        pagina: 0,
        estado_Id: 0,
        usuario_Creacion: 0,
        documento_Referencia: '',
        fecha_Creacion: new Date(),
      };
    })
  }
  openRequisitoDialogData(data: Requisito) {
    const dialogoEDT = this.dialog.open(DialogRequsitosFormComponent, { data: { data: data, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listRequisitosTecnicosget();
      this.listRequisitosContractualesget();
      this.listEDT = [];
      this.listActividades_Proyecto = [];
      this.RequisitosSelect = {
        id: 0,
        proyecto_ID: 0,
        descripcion: '',
        creador_Documento: '',
        documento: '',
        responsable: '',
        lista_Despegable_Requisito: 0,
        clausula: '',
        fecha_Apertura: new Date(),
        numeral: 0,
        observaciones: '',
        pagina: 0,
        estado_Id: 0,
        usuario_Creacion: 0,
        documento_Referencia: '',
        fecha_Creacion: new Date(),
      };
    })
  }
  openEDTDialog() {

    this.EDTs.proyecto_Id = this.id;
    const dialogoEDT = this.dialog.open(DialogEDTFormComponent, { data: { data: this.EDTs, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.EDTListRefres();
      this.listActividades_Proyecto = [];
      this.EDTselect = {
        id: 0,
        numeral: 0,
        tipo_Entregable: 0,
        nombre_Cuenta: '',
        descripcion_Cuenta: '',
        fecha_Entrega: new Date(),
        margen_demora: '',
        estado_Id: 0,
        proyecto_Id: 0,
        usuario_Creacion: 0,
        fecha_Creacion: new Date(),
      };
    })


  }
  openEDTDialogData(data: EDT) {
    const dialogoEDT = this.dialog.open(DialogEDTFormComponent, { data: { data: data, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.EDTListRefres();
      this.listActividades_Proyecto = [];
      this.EDTselect = {
        id: 0,
        numeral: 0,
        tipo_Entregable: 0,
        nombre_Cuenta: '',
        descripcion_Cuenta: '',
        fecha_Entrega: new Date(),
        margen_demora: '',
        estado_Id: 0,
        proyecto_Id: 0,
        usuario_Creacion: 0,
        fecha_Creacion: new Date(),
      };
    })
  }
  openComunicacionDialog() {
    this.Comunicacions.proyecto_Id = this.id;
    const dialogoEDT = this.dialog.open(DialogComunicacionCrearFormComponent, { data: this.Comunicacions });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.ComunicacionList();
    })
  }
  openComunicacionMasivoDialog() {
    this.Comunicacions.proyecto_Id = this.id;
    const dialogoEDT = this.dialog.open(DialogComunicacionMasivoFormComponent, { data: this.Comunicacions });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.ComunicacionList();
    })
  }

  openInteresadoMasivoDialog() {
    this.Interesados.proyecto_Id = this.id;
    const dialogoInteresados = this.dialog.open(DialogInteresadosMasivoFormComponent, { data: this.Interesados });
    dialogoInteresados.beforeClosed().subscribe(result => {
      this.InteresadosListRefres();
    })
  }
  openRiegosMasivoDialog() {
    this.Interesados.proyecto_Id = this.id;
    const dialogoInteresados = this.dialog.open(DialogInteresadosMasivoFormComponent, { data: this.Interesados });
    dialogoInteresados.beforeClosed().subscribe(result => {
      this.InteresadosListRefres();
    })
  }
  openRequisitoMasivoTecnicoDialog() {
    this.Requisitos.lista_Despegable_Requisito = 30;
    const dialogoEDT = this.dialog.open(DialogRequsitosMasivoFormComponent, { data: { data: this.Requisitos, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listRequisitosTecnicosget();
      this.listRequisitosContractualesget();
      this.listEDT = [];
      this.listActividades_Proyecto = [];
      this.RequisitosSelect = {
        id: 0,
        proyecto_ID: 0,
        descripcion: '',
        creador_Documento: '',
        lista_Despegable_Requisito: 0,
        clausula: '',
        documento: '',
        responsable: '',
        fecha_Apertura: new Date(),
        numeral: 0,
        observaciones: '',
        pagina: 0,
        estado_Id: 0,
        usuario_Creacion: 0,
        documento_Referencia: '',
        fecha_Creacion: new Date(),
      };
    })
  }
  openRequisitoMasivoContractualDialog() {
    this.Requisitos.lista_Despegable_Requisito = 29;
    const dialogoEDT = this.dialog.open(DialogRequsitosMasivoFormComponent, { data: { data: this.Requisitos, datapro: this.proyectos } });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.listRequisitosTecnicosget();
      this.listRequisitosContractualesget();
      this.listEDT = [];
      this.listActividades_Proyecto = [];
      this.RequisitosSelect = {
        id: 0,
        proyecto_ID: 0,
        descripcion: '',
        creador_Documento: '',
        lista_Despegable_Requisito: 0,
        clausula: '',
        fecha_Apertura: new Date(),
        numeral: 0,
        observaciones: '',
        documento: '',
        responsable: '',
        pagina: 0,
        estado_Id: 0,
        usuario_Creacion: 0,
        documento_Referencia: '',
        fecha_Creacion: new Date(),
      };
    })
  }

  openComunicacionDialogData(data: Comunicacion) {
    const dialogoEDT = this.dialog.open(DialogComunicacionCrearFormComponent, { data: data });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.ComunicacionList();
    })
  }
  eliminarComunicacion(datos: Comunicacion) {
    this.http.delete<EDT[]>('/Comunicaciones?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.ComunicacionList();
      }
      else {
      };
    }, error => console.error(error));

  }
  openRiesgoDialog() {
    this.Riesgo_Proyectos.proyecto_Id = this.id;
    const dialogoEDT = this.dialog.open(DialogRiesgoCrearFormComponent, { data: this.Riesgo_Proyectos });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.RiesgoProyectoList();
    })
  }
  openRiesgoMasivoDialog() {
    this.Riesgo_Proyectos.proyecto_Id = this.id;
    const dialogoEDT = this.dialog.open(DialogRiegosMasivoFormComponent, { data: this.Riesgo_Proyectos });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.RiesgoProyectoList();
    })
  }
  openRiesgoDialogDialogData(data: Riesgo_Proyecto) {
    const dialogoEDT = this.dialog.open(DialogRiesgoCrearFormComponent, { data: data });
    dialogoEDT.beforeClosed().subscribe(result => {
      this.RiesgoProyectoList();
    })
  }
  eliminarRiesgo(datos: Riesgo_Proyecto) {
    this.http.delete<Riesgo_Proyecto[]>('/RiesgoProyecto?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.RiesgoProyectoList();
      }
      else {
      };
    }, error => console.error(error));

  }

}


@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      iframe {
        width: 800px;
      }
    `,
  ],
  templateUrl: '../Proyecto/Interesados/dialog-Interesados-form.html',
})
export class DialogInteresadosFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public Interesados: Interesado = {
    id: 0,
    nombre: '',
    celular: '',
    correo: '',
    lista_Despegable_Clasificacion: 0,
    lista_Despegable_Compromiso: 0,
    cargo: '',
    rol: 0,
    expectativas: 0,
    nivel_Apoyo: '',
    masivo: false,
    estado_Id: 0,
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  nivel_Apoyo = '';
  public list: any[] = [];

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row demo-full-width',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'nombre',
          templateOptions: {
            label: 'Nombre',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'celular',
          templateOptions: {
            label: 'Celular',
            required: false,
            maxLength: 15,
            minLength: 0
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [

        {
          className: 'col-sm-12',
          type: 'combobox',

          key: 'lista_Despegable_Clasificacion',
          templateOptions: {
            label: 'Clasificacíon',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsClasificacion(field)
          },
        },
        {
          className: 'col-sm-12',
          type: 'combobox',
          key: 'lista_Despegable_Compromiso',
          templateOptions: {
            label: 'Compromiso',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsCompromiso(field)
          },
        },

      ],
    },
    {
      className: 'col-sm-6',
      type: 'combobox',
      key: 'expectativas',
      templateOptions: {
        label: 'Expectativas',
        options: [],
        labelProp: 'nombre',
        valueProp: 'id',
        required: true,
      },
      hooks: {
        onInit: (field) => this.loadOptionsExpectativas(field)
      },
    },
    //{
    //  fieldGroupClassName: 'row',
    //  fieldGroup: [
    //    {
    //      className: 'col-sm-12',
    //      type: 'input',
    //      key: 'expectativas',
    //      templateOptions: {
    //        type: 'input',
    //        label: 'Expectativas',
    //        required: true,
    //        maxLength: 100,
    //        minLength: 0
    //      },
    //    },
    //  ],
    //},
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'correo',
          templateOptions: {
            label: 'Correo',
            required: false,
            maxLength: 50,
            minLength: 0,
            type: 'email',
            pattern: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]',
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => 'Correo no valido',
            },
          },
        },
        {
          className: 'col-sm-6',
          type: 'combobox',
          key: 'rol',
          templateOptions: {
            label: 'Rol',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsRol(field)
          },
        },
        //{
        //  className: 'col-sm-6',
        //  type: 'input',
        //  key: 'rol',
        //  templateOptions: {
        //    type: 'input',
        //    label: 'Rol',
        //    required: true,
        //    maxLength: 20,
        //    minLength: 0
        //  },
        //},
        //{
        //  className: 'col-sm-6',
        //  type: 'combobox',
        //  key: 'nivel_Apoyo',
        //  templateOptions: {
        //    label: 'Nivel de Apoyo',
        //    options: [],
        //    labelProp: 'nombre',
        //    valueProp: 'nombre',
        //    required: true,

        //  },

        //hooks: {
        //  //onChanges: (field) => this.mensaje(field),
        //  onInit: (field) => this.loadOptionsNivelApoyo(field)
        //},
        /*   },*/
        //{
        //  className: 'col-sm-4',
        //  type: 'input',
        //  key: 'nivel_Apoyo',
        //  templateOptions: {
        //    label: 'Nivel de apoyo',
        //    required: true,
        //    type: 'input',
        //  },
        //},


      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogInteresadosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Interesado) {

    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=3').subscribe(result => {

      this.list = result;

    }, error => console.error(error));

    if (data.id > 0) {
      this.Interesados = data;
      //this.nivel_Apoyo = data.nivel_Apoyo;
    }
    else
      this.Interesados.proyecto_Id = data.proyecto_Id;
  }

  loadOptionsExpectativas(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=22').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;

    }, error => console.error(error));

  }
  loadOptionsClasificacion(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=2').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;

    }, error => console.error(error));

  }
  mensaje(field: FormlyFieldConfig | undefined) {
    debugger
    if (this.Interesados.nivel_Apoyo != '') {
      if (this.Interesados.nivel_Apoyo == 'No consciente') {
        this.snackBar.open('El interesado no expone interés frente al proyecto ni su impacto.', 'Cerrar', { duration: 5000 });

      }
      if (this.Interesados.nivel_Apoyo == 'Resistente') {
        this.snackBar.open('El interesado es consciente del proyecto y su impacto, pero se encuentra en una postura negativa o de resistencia frente al mismo.', 'Cerrar', { duration: 5000 });

      }
      if (this.Interesados.nivel_Apoyo == 'Neutral') {
        this.snackBar.open('El interesado es consciente del proyecto y su impacto, pero no refleja postura de colaboración ni de resistencia.', 'Cerrar', { duration: 5000 });

      }
      if (this.Interesados.nivel_Apoyo == 'Involucrado') {
        this.snackBar.open('El interesado es consciente del proyecto y su impacto y se encuentra en una postura colaborativa y de apoyo al mismo.', 'Cerrar', { duration: 5000 });

      }
      if (this.Interesados.nivel_Apoyo == 'Comprometido') {
        this.snackBar.open('El interesado es consciente del proyecto y su impacto y está en una postura de liderazgo y colaboración para el cumplimiento de los objetivos del proyecto.', 'Cerrar', { duration: 5000 });

      }
    }
  }
  loadOptionsCompromiso(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=16').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  loadOptionsRol(field: FormlyFieldConfig | undefined): void {
    this.http.get<Rol[]>('/Rol/Tipo?Tipo=47').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  loadOptionsNivelApoyo(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=3').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarInteresados() {
    debugger

    //this.data.nivel_Apoyo = this.nivel_Apoyo;
    if (this.form2.valid) {
      if (this.Interesados.id != 0)
        this.http.put<Interesado>('/intere', this.Interesados).subscribe(result => {
          this.Interesados = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Interesado[]>('/intere', this.Interesados).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Interesados/dialog-InteresadosImportar-form.html',
})
export class DialogInteresadosMasivoFormComponent {
  id = 0;
  public ArchivoExcel: any;
  public archivos: any = []
  public Data: any[] = [];
  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  baseUrl = '';
  columnsComunicaciones: MtxGridColumn[] = [
    {
      header: 'Error',
      field: 'error',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Fila',
      field: 'fila',
      sortable: true,
      disabled: true,
      minWidth: 100,
    }

  ];

  public model: Interesado = {
    id: 0,
    nombre: '',
    celular: '',
    correo: '',
    lista_Despegable_Clasificacion: 0,
    lista_Despegable_Compromiso: 0,
    cargo: '',
    rol: 0,
    expectativas: 0,
    nivel_Apoyo: '',
    masivo: false,
    estado_Id: 0,
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date()
  }

  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogInteresadosMasivoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Interesado) {
    debugger
    if (data.id > 0)
      this.model = data;
    else
      this.model.proyecto_Id = data.proyecto_Id;
  }
  capturarFile(event: any) {
    this.ArchivoExcel = event.target.files[0];
    const archivoCapturado = event.target.files[0]
    this.archivos.push(archivoCapturado);
  }


  guardarComunicacionMasivo() {
    debugger
    try {
      const formularioDeDatos = new FormData();
      for (let file of this.archivos) {
        formularioDeDatos.append("ArchivoExcel", file);
      }
      this.http.post<errores>('/intere/Subir?id=' + this.model.proyecto_Id, formularioDeDatos).subscribe((importarcomponentservice) => {
        this.Data = importarcomponentservice.data;

        if (importarcomponentservice.error) {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
        }
        else {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
          this.getdatatable();
        }
        //  console.log(importarcomponentservice.data);

      })
    }
    catch (e) {
      //  console.log('error en la funcion subir archivo: ',e);
    }

  }
  getdatatable() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/EDT/dialog-EDT-form.html',
})
export class DialogEDTFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public EDTs: EDT = {
    id: 0,
    numeral: 0,
    tipo_Entregable: 0,
    nombre_Cuenta: '',
    descripcion_Cuenta: '',
    margen_demora: '',
    estado_Id: 0,
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  public proyectos: proyecto = {
    id: 0,
    nombre: '',
    nombre_Diminutivo: '',
    descripccion: '',
    cliente_Id: 0,
    gerente_Proyecto: '',
    presupuesto: '',
    contrato: '',
    fecha_Inicio: new Date(),
    fecha_Fin: new Date(),
    duracion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date()
  };
  public listRequisitos: any[] = [];
  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  baseUrl = '';
  Disable = 'collapse';

  columnsRequisitosVista: MtxGridColumn[] = [
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },

    {
      header: 'Descripcion',
      field: 'descripcion',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [

        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarRequisito(record),
        },
      ],
    }
  ];

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'combobox',
          key: 'tipo_Entregable',
          templateOptions: {
            label: 'Tipo de Entregable',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
            maxLength: 50,
            minLength: 0
          },
          hooks: {
            onInit: (field) => this.loadOptionsCuenta_Control(field)
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'nombre_Cuenta',
          templateOptions: {
            label: 'Nombre',
            required: true,
            maxLength: 100,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'descripcion_Cuenta',
          templateOptions: {
            label: 'Descripcion ',
            rows: 4,
            type: 'textarea',
            required: true,
            maxLength: 250,
            minLength: 0
          },
        },
      ],
    },
    //{
    //  fieldGroupClassName: 'row',
    //  fieldGroup: [
    //    {
    //      className: 'col-sm-6',
    //      type: 'datepicker',
    //      key: 'fecha_Entrega',
    //      templateOptions: {
    //        datepickerOptions: {
    //          min: new Date(),
    //        },
    //        label: 'Fecha de entrega',
    //        required: true,
    //      },
    //    },

    //    {
    //      className: 'col-sm-6',
    //      type: 'input',
    //      key: 'margen_demora',
    //      templateOptions: {
    //        label: 'margen de demora',
    //        required: true,
    //      },
    //    },

    //  ],
    //},
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogEDTFormComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { data: EDT, datapro: proyecto }) {
    this.proyectos = data.datapro;

    this.fields2.push(
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-6',
            type: 'datepicker',
            key: 'fecha_Entrega',
            templateOptions: {
              datepickerOptions: {
                min: new Date(),
                max: data.datapro.fecha_Fin,
              },
              label: 'Fecha de entrega',

            },
          },
          {
            className: 'col-sm-6',
            type: 'input',
            key: 'margen_demora',
            templateOptions: {
              label: 'Margen de demora',
              type: 'number',
              required: false,
              placeholder: 'Procentaje de Demora',
              min: 0,
            },
          },

        ],
      }
    );
    if (data.data.id > 0) {
      this.EDTs = data.data;
      this.Disable = 'visible'
      this.RequisitosList();
    }
    else {
      this.EDTs.proyecto_Id = data.data.proyecto_Id;
    }
  }
  AsignarRequisitos() {
    const dialogoRecurso = this.dialog.open(DialogRequisitosAsignarFormComponent, { data: { data: this.EDTs, datapro: this.proyectos } });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.RequisitosList();
    })
  }
  RequisitosList() {
    this.isLoading = true;
    this.http.get<Requisito[]>('/Requisitos_Proyecto_Entregables?Entregable_Id=' + this.EDTs.id).subscribe(result => {
      this.listRequisitos = result;
      this.isLoading = false;
    }, error => console.error(error));
  }
  eliminarRequisito(datos: Requisito) {
    this.http.delete<Requisito[]>('/Requisitos_Proyecto_Entregables?id=' + datos.id + '&Entre_id=' + this.EDTs.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.RequisitosList();

      }
      else {
      };
    }, error => console.error(error));

  }
  loadOptionsCuenta_Control(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=6').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarEDT() {
    debugger
    if (this.EDTs.margen_demora != null) {
      this.EDTs.margen_demora = this.EDTs.margen_demora.toString();
    }
    if (this.form2.valid) {
      if (this.EDTs.id != 0)
        //this.http.put<EDT>(, this.EDTs).subscribe(result => { 
        this.http.put<EDT>('/EDT', this.EDTs).subscribe(result => {
          this.EDTs = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<EDT[]>('/EDT', this.EDTs).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Requisitos/dialog-Requisitos-form.html',
})
export class DialogRequsitosFormComponent {
  id = 0;
  public TipoRequisito = '';
  form2 = new FormGroup({});
  public Requisitos: Requisito = {
    id: 0,
    proyecto_ID: 0,
    descripcion: '',
    creador_Documento: '',
    documento: '',
    responsable: '',
    lista_Despegable_Requisito: 0,
    clausula: '',
    fecha_Apertura: new Date(),
    numeral: 0,
    observaciones: '',
    pagina: 0,
    estado_Id: 0,
    usuario_Creacion: 0,
    documento_Referencia: '',
    fecha_Creacion: new Date(),
  };

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'combobox',
          key: 'lista_Despegable_Requisito',
          templateOptions: {
            label: 'Tipo',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
            selectOptions: {
              change: (field: any, $event: any) => {
                if (this.Requisitos.lista_Despegable_Requisito == 29)
                  this.TipoRequisito = 'RC';
                else
                  this.TipoRequisito = 'RT';
              }, 
            }
          },
          hooks: {
            onInit: (field) => this.loadOptionsRequisito(field)
          },
          
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'clausula',
          templateOptions: {
            label: 'Clausula',
            required: true,
            maxLength: 20,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'descripcion',
          templateOptions: {
            label: 'Descripcion',
            type: 'textarea',
            rows: 3,
            required: true,
          },
        },
      ],
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-12',
          type: 'input',
          key: 'creador_Documento',
          templateOptions: {
            label: 'Entidad Emisora del Documento',
            required: true,
            maxLength: 100,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'input',
          key: 'observaciones',
          templateOptions: {
            label: 'Observaciones',
            required: false,
            maxLength: 250,
            minLength: 0
          },
        },

      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-12',
          type: 'input',
          key: 'documento',
          templateOptions: {
            label: 'Documento',
            required: true,
            maxLength: 100,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'input',
          key: 'responsable',
          templateOptions: {
            label: 'Responsable',
            required: false,
            maxLength: 250,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'pagina',
          templateOptions: {
            label: 'Pagina de Documento',
            type: 'number',
            required: true,
            min: 0,

          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'numeral',
          templateOptions: {
            label: 'Literal-Numeral',
            required: true,
            min: 0,

          },
        },

      ],
    },
    //{
    //  fieldGroupClassName: 'row',
    //  fieldGroup: [
    //    {
    //      className: 'col-sm-4',
    //      type: 'datepicker',
    //      key: 'fecha_Apertura',
    //      templateOptions: {
    //        label: 'Fecha de apertura',
    //        datepickerOptions: {
    //          min: new Date,
    //        },
    //        required: true,
    //      },

    //    },

    //  ],
    //},
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRequsitosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Requisito, datapro: proyecto }) {
    if (data.data.id > 0) {
      debugger
      this.Requisitos = data.data;
      if (data.data.lista_Despegable_Requisito == 29)
        this.TipoRequisito = 'RC';
      else
        this.TipoRequisito = 'RT';
    }
    else
      this.Requisitos.proyecto_ID = data.datapro.id;
  }
  selectreque(field: FormlyFieldConfig | undefined): void {
    debugger
    if (this.Requisitos.lista_Despegable_Requisito == 29)
      this.TipoRequisito = 'RC';
    else
      this.TipoRequisito = 'RT';
  }
  loadOptionsRequisito(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=5').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarEDT() {
    debugger
    if (this.form2.valid) {
      if (this.Requisitos.id != 0)
        this.http.put<Requisito>('/Requisito', this.Requisitos).subscribe(result => {
          this.Requisitos = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Requisito[]>('/Requisito', this.Requisitos).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Requisitos/dialog-RequisitosImportar-form.html',
})
export class DialogRequsitosMasivoFormComponent {
  id = 0;
  TipoRequi = '';
  public ArchivoExcel: any;
  public archivos: any = []
  public Data: any[] = [];
  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  baseUrl = '';
  columnsComunicaciones: MtxGridColumn[] = [
    {
      header: 'Error',
      field: 'error',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Fila',
      field: 'fila',
      sortable: true,
      disabled: true,
      minWidth: 100,
    }

  ];

  public model: Requisito = {
    id: 0,
    proyecto_ID: 0,
    descripcion: '',
    creador_Documento: '',
    lista_Despegable_Requisito: 0,
    clausula: '',
    fecha_Apertura: new Date(),
    numeral: 0,
    observaciones: '',
    pagina: 0,
    documento: '',
    responsable: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    documento_Referencia: '',
    fecha_Creacion: new Date(),
  }

  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRequsitosMasivoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Requisito, datapro: proyecto }) {
    if (data.data.lista_Despegable_Requisito == 20)
      this.TipoRequi = 'Contractual';
    if (data.data.lista_Despegable_Requisito == 30)
      this.TipoRequi = 'Tecnico';
    debugger
    if (data.data.id > 0)
      this.model = data.data;
    else {
      this.model.proyecto_ID = data.datapro.id;
      this.model.lista_Despegable_Requisito = data.data.lista_Despegable_Requisito;
    }

  }
  capturarFile(event: any) {
    this.ArchivoExcel = event.target.files[0];
    const archivoCapturado = event.target.files[0]
    this.archivos.push(archivoCapturado);
  }


  guardarComunicacionMasivo() {
    debugger
    try {
      const formularioDeDatos = new FormData();
      for (let file of this.archivos) {
        formularioDeDatos.append("ArchivoExcel", file);
      }
      this.http.post<errores>('/Requisito/Subir?id=' + this.model.proyecto_ID + '&tipoid=' + this.model.lista_Despegable_Requisito, formularioDeDatos).subscribe((importarcomponentservice) => {
        this.Data = importarcomponentservice.data;

        if (importarcomponentservice.error) {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
        }
        else {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
          this.getdatatable();
        }
        //  console.log(importarcomponentservice.data);

      })
    }
    catch (e) {
      //  console.log('error en la funcion subir archivo: ',e);
    }

  }
  getdatatable() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Actividades/dialog-Actividades-form.html',
})
export class DialogActividadesFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public Actividades_Proyecto: Actividades_Proyecto = {
    id: 0,
    fecha_Inicial: new Date(),
    fecha_Final: new Date(),
    proyecto_ID: 0,
    actividad_Id: 0,
    requisito_Id: 0,
    duracion: '',
    fecha_Entrega: new Date(),
    numeral: 0,
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  }
  public proyectos: proyecto = {
    id: 0,
    nombre: '',
    nombre_Diminutivo: '',
    descripccion: '',
    cliente_Id: 0,
    gerente_Proyecto: '',
    presupuesto: '',
    contrato: '',
    fecha_Inicio: new Date(),
    fecha_Fin: new Date(),
    duracion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date()
  };
  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  Disable = 'collapse';

  public listEDT: any[] = [];
  columnsEDT: MtxGridColumn[] = [
    {
      header: 'Numeral',
      field: 'numeral',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Nombre Cuenta',
      field: 'nombre_Cuenta',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarEDT(record),
        },
      ],
    }
  ];

  public model: Actividad = {
    id: 0,
    lista_Despegable_Actividad: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  fields2: FormlyFieldConfig[] = [
    {

      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-12',
          type: 'combobox',
          key: 'actividad_Id',
          templateOptions: {
            label: 'Actividad ',
            options: [],
            selectOptions: {
              click: (field: any) => this.loadOptions(field),
            },
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptions(field)
          },
        },

      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActividadesFormComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { data: Actividades_Proyecto, datapro: proyecto }) {
    this.fields2.push(
      {

        fieldGroup: [
          {
            className: 'col-sm-4',
            type: "datepicker",
            key: "fecha_Inicial",
            templateOptions: {
              datepickerOptions: {
                min: new Date(),
                max: this.data.datapro.fecha_Fin,
                dateChange: () => this.calulardias(),
              },
              label: 'Fecha Inicio',
              required: true,
            },
          },
          {
            className: 'col-sm-4',
            type: 'datepicker',
            key: 'fecha_Final',
            templateOptions: {
              label: 'Fecha Fin',
              datepickerOptions: {
                min: new Date(),
                max: this.data.datapro.fecha_Fin,
                dateChange: () => this.calulardias(),
                //min: 'proyectos.fecha_Inicio',
              },
              required: true,
            },
            expressionProperties: { 'templateOptions.datepickerOptions.min': 'model.fecha_Inicial', }
          },


        ],
      },
      {

        fieldGroupClassName: 'row',
        fieldGroup: [
          //{
          //  className: 'col-sm-6',
          //  type: 'input',
          //  key: 'duracion',
          //  templateOptions: {
          //    label: 'Duracion',
          //    required: true,
          //  },
          //},
          {
            className: 'col-sm-12',
            type: 'datepicker',
            key: 'fecha_Entrega',
            templateOptions: {
              datepickerOptions: {
                min: new Date(),
                max: this.data.datapro.fecha_Fin,
              },
              label: 'Fecha de entrega',
              required: true,
            },

            expressionProperties: { 'templateOptions.datepickerOptions.min': 'model.fecha_Final', }

          },

        ],
      }
    );
    if (data.data.id > 0) {
      this.Actividades_Proyecto = data.data;
      this.proyectos = data.datapro;
      this.EDTListrefres();
      this.Disable = 'visible';
    }
    else {
      this.Actividades_Proyecto.proyecto_ID = data.datapro.id;
      if (data.data.requisito_Id > 0) {
        this.Actividades_Proyecto.requisito_Id = data.data.requisito_Id;

      }
    }
  }
  EDTListrefres() {
    this.isLoading = true;
    this.http.get<EDT[]>('/Actividades_Proyecto_Entregables?Actividad_Id=' + this.Actividades_Proyecto.id).subscribe(result => {
      this.listEDT = result;
      this.isLoading = false;
    }, error => console.error(error));
  }

  AsignarRequisitos() {
    const dialogoRecurso = this.dialog.open(DialogEDTAsignarFormComponent, { data: { data: this.Actividades_Proyecto, datapro: this.proyectos } });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.EDTListrefres();
    })
  }
  eliminarEDT(datos: EDT) {
    this.http.delete<EDT[]>('/Actividades_Proyecto_Entregables?id=' + this.Actividades_Proyecto.id + '&Entre_id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.EDTListrefres();
      }
      else {
      };
    }, error => console.error(error));

  }
  ModalIntervalos() {
    const dialogoRecurso = this.dialog.open(DialogActividadesIntervalosFormComponent, { data: { data: this.Actividades_Proyecto, datapro: this.proyectos } });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.EDTListrefres();
    })
  }
  calulardias(field?: FormlyFieldConfig, event?: any) {
    debugger

    if (this.Actividades_Proyecto.fecha_Inicial != null && this.Actividades_Proyecto.fecha_Final != null) {
      var fechaInicio = new Date(this.Actividades_Proyecto.fecha_Inicial.toString()).getTime();
      var fechaFin = new Date(this.Actividades_Proyecto.fecha_Final.toString()).getTime();

      var diff = fechaInicio - fechaFin;
      var duracion = (((diff / (1000 * 60 * 60 * 24)) * -1).toString() + ' Días');
      this.Actividades_Proyecto.duracion = ((diff / (1000 * 60 * 60 * 24) * -1).toString() + ' Días');
      this.snackBar.open('La Duración del proyecto sera de ' + duracion, 'Cerrar', { duration: 5000 });
    }
  }

  loadOptions(field: FormlyFieldConfig | undefined): void {
    debugger
    this.http.get<Actividad[]>('/Actividad').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarActividad() {
    if (this.form2.valid) {
      if (this.Actividades_Proyecto.id != 0)
        this.http.put<Actividades_Proyecto>('/Actividad_Proyecto', this.Actividades_Proyecto).subscribe(result => {
          this.Actividades_Proyecto = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Actividades_Proyecto[]>('/Actividad_Proyecto', this.Actividades_Proyecto).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  CrearActividad() {
    const dialogoRecurso = this.dialog.open(DialogActividadesCrearFormComponent, { data: this.model });
    dialogoRecurso.beforeClosed().subscribe(result => {
      /*this.getdata();*/
    })
  }
  getdatatable() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Actividades/dialog-ActividadesIntervalos-form.html',
})
export class DialogActividadesIntervalosFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public Actividades_Proyecto: Actividades_Proyecto = {
    id: 0,
    fecha_Inicial: new Date(),
    fecha_Final: new Date(),
    proyecto_ID: 0,
    actividad_Id: 0,
    requisito_Id: 0,
    duracion: '',
    fecha_Entrega: new Date(),
    numeral: 0,
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  }
  public Intervalo_actividades: Intervalo_actividades = {
    id: 0,
    actividad_Proyecto_Id: 0,
    fecha_Inicio: new Date,
    fecha_Fin: new Date,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }
  public proyectos: proyecto = {
    id: 0,
    nombre: '',
    nombre_Diminutivo: '',
    descripccion: '',
    cliente_Id: 0,
    gerente_Proyecto: '',
    presupuesto: '',
    contrato: '',
    fecha_Inicio: new Date(),
    fecha_Fin: new Date(),
    duracion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date()
  };
  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  Disable = 'collapse';

  public listIntervalos: any[] = [];

  columnsIntervalos: MtxGridColumn[] = [
    {
      header: 'Fecha Inicio',
      field: 'fecha_Inicio',
      sortable: true,
      disabled: true,
      minWidth: 150,
    },
    {
      header: 'Fecha Fin',
      field: 'fecha_Fin',
      sortable: true,
      disabled: true,
      minWidth: 150,
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          click: record => this.eliminarEDT(record),
        },
      ],
    }
  ];

  public model: Actividad = {
    id: 0,
    lista_Despegable_Actividad: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  fields2: FormlyFieldConfig[] = [
    {
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActividadesFormComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { data: Actividades_Proyecto, datapro: proyecto }) {
    debugger
    this.fields2.push(
      {

        fieldGroup: [
          {
            className: 'col-sm-4',
            type: "datepicker",
            key: "fecha_Inicio",
            templateOptions: {
              datepickerOptions: {
                min: new Date(),
                max: this.data.data.fecha_Final,
              },
              label: 'Fecha Inicio',
              required: true,
            },
          },
          {
            className: 'col-sm-4',
            type: 'datepicker',
            key: 'fecha_Fin',
            templateOptions: {
              label: 'Fecha Fin',
              datepickerOptions: {
                min: new Date(),
                max: this.data.data.fecha_Final,
                //min: 'proyectos.fecha_Inicio',
              },
              required: true,
            },
            expressionProperties: { 'templateOptions.datepickerOptions.min': 'model.fecha_Inicio', }
          },


        ],
      },
    );
    if (data.data.id > 0) {
      this.Actividades_Proyecto = data.data;
      this.proyectos = data.datapro;
      this.EDTListrefres();
      this.Disable = 'visible';
    }
    else {
      this.Actividades_Proyecto.proyecto_ID = data.datapro.id;
      if (data.data.requisito_Id > 0) {
        this.Actividades_Proyecto.requisito_Id = data.data.requisito_Id;

      }
    }
  }
  EDTListrefres() {
    this.isLoading = true;
    this.http.get<Intervalo_actividades[]>('/Intervalo_Acividad?Actividad_Id=' + this.Actividades_Proyecto.id).subscribe(result => {
      this.listIntervalos = result;
      this.isLoading = false;
    }, error => console.error(error));
  }

  AsignarRequisitos() {
    const dialogoRecurso = this.dialog.open(DialogEDTAsignarFormComponent, { data: { data: this.Actividades_Proyecto, datapro: this.proyectos } });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.EDTListrefres();
    })
  }
  eliminarEDT(datos: Intervalo_actividades) {
    this.http.delete<EDT[]>('/Intervalo_Acividad?id=' + datos.id).subscribe(result => {
      if (result) {
        this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
        this.EDTListrefres();
      }
      else {
      };
    }, error => console.error(error));

  }

  guardarIntervalo() {
    if (this.form2.valid) {
      this.Intervalo_actividades.actividad_Proyecto_Id = this.Actividades_Proyecto.id;
      this.http.post<Actividades_Proyecto[]>('/Intervalo_Acividad', this.Intervalo_actividades).subscribe(result => {
        this.Intervalo_actividades = {
          id: 0,
          actividad_Proyecto_Id: 0,
          fecha_Inicio: new Date,
          fecha_Fin: new Date,
          usuario_Creacion: 0,
          fecha_Creacion: new Date,
        };
        if (result) {
          this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
          this.EDTListrefres();
          //this.getdatatable();
        } else
          this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
      }, error => console.error(error));
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}




@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Recursos/dialog-Recursos-form.html',
})
export class DialogRecursos_ProyectosFormComponent {

  id = 0;
  form2 = new FormGroup({});
  public Recursos_Proyecto: Recursos_Proyecto = {
    id: 0,
    proyecto_ID: 0,
    recurso_ID: 0,
    cantidad: '',
    costo_Mensual: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
    Tipo_id: 0,
  }
  public Recursos: Recurso[] = [];
  public recurso: Recurso = {
    id: 0,
    lista_Despegable_Tipo: 0,
    descripcion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  };

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'combobox',
          key: 'Tipo_id',
          templateOptions: {
            label: 'Tipo Recurso',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            selectOptions: {
            },
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionstipo(field)
          },
        },
        {
          className: 'col-sm-5',
          type: 'combobox',
          key: 'recurso_ID',
          templateOptions: {
            label: 'Recurso ',
            options: this.Recursos,
            labelProp: 'descripcion',
            valueProp: 'id',
            selectOptions: {
              click: (field: any) => this.oncarge(field),
            },
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptions(field)
          },
        },

        {
          className: 'col-sm-6',
          type: 'input',
          key: 'cantidad',
          templateOptions: {
            type: 'number',
            label: 'Cantidad',
            required: true,
            min: 0,
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'costo_Mensual',
          templateOptions: {
            type: 'number',
            label: 'Costo Mensual',
            required: true,
            min: 0
          },
        },


      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRecursos_ProyectosFormComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Recursos_Proyecto) {
    debugger

    if (data.id > 0) {
      this.Recursos_Proyecto = data;

    }
    else {
      this.Recursos_Proyecto.proyecto_ID = data.proyecto_ID;

    }
  }
  loadOptions(field: FormlyFieldConfig | undefined): void {
    debugger
    if (this.Recursos_Proyecto.Tipo_id != null)
      if (this.Recursos_Proyecto.Tipo_id > 0) {
        this.http.get<Recurso[]>('/Recurso/Tipo?tipo=' + this.Recursos_Proyecto.Tipo_id).subscribe(result => {
          if (!field || !field.templateOptions) {
            return;
          }
          field.templateOptions.options = result;
        }, error => console.error(error));
      }

  }
  loadOptionstipo(field: FormlyFieldConfig | undefined): void {
    debugger
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=20').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));
  }
  oncarge(field: FormlyFieldConfig | undefined): void {
    this.http.get<Recurso[]>('/Recurso/Tipo?tipo=' + this.Recursos_Proyecto.Tipo_id).subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));
  }
  guardarRecurso() {
    debugger
    this.Recursos_Proyecto.cantidad = this.Recursos_Proyecto.cantidad.toString();
    this.Recursos_Proyecto.costo_Mensual = this.Recursos_Proyecto.costo_Mensual.toString();
    if (this.form2.valid) {
      if (this.Recursos_Proyecto.id != 0)
        this.http.put<Recursos_Proyecto>('/Recurso_Proyecto', this.Recursos_Proyecto).subscribe(result => {
          this.Recursos_Proyecto = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Recursos_Proyecto[]>('/Recurso_Proyecto', this.Recursos_Proyecto).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  CrearRecurso() {
    const dialogoRecurso = this.dialog.open(DialogRecursosCrearFormComponent, { data: this.recurso });
    dialogoRecurso.beforeClosed().subscribe(result => {
      /*this.getdata();*/
    })
  }
  getdatatable() {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Recursos/dialog-RecursosCrear-form.html',
})
export class DialogRecursosCrearFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public model: Recurso = {
    id: 0,
    lista_Despegable_Tipo: 0,
    descripcion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-12',
          type: 'combobox',
          key: 'lista_Despegable_Tipo',
          templateOptions: {
            label: 'Tipo',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsTipo(field)
          },
        },
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'descripcion',
          templateOptions: {
            type: 'textarea',
            label: 'Descripción',
            required: true,
            maxLength: 250,
            rows: 3,
            minLength: 0
          },
        },

      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRecursosCrearFormComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Recurso) {
    if (data.id > 0)
      this.model = data;
  }

  loadOptionsTipo(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=20').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarRecursos() {
    debugger
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Recurso>('/Recurso', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Recurso[]>('/Recurso', this.model).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Actividades/dialog-ActividadesCrear-form.html',
})
export class DialogActividadesCrearFormComponent {
  id = 0;
  form2 = new FormGroup({});

  public model: Actividad = {
    id: 0,
    lista_Despegable_Actividad: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'nombre',
          templateOptions: {
            label: 'Nombre',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'combobox',
          key: 'lista_Despegable_Actividad',
          templateOptions: {
            label: 'Tipo',
            options: [
              { id: 7, name: 'Tipo Actividad' },
            ],
            labelProp: 'name',
            valueProp: 'id',
            required: true,
          },
        },
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActividadesCrearFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Actividad) {
    if (data.id > 0)
      this.model = data;
  }
  guardarActividad() {
    debugger
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Actividad>('/Actividad', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Actividad[]>('/Actividad', this.model).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Requisitos/dialog-RequisitosAsignar-form.html',
})
export class DialogRequisitosAsignarFormComponent {
  id = 0;
  public list: any[] = [];
  form2 = new FormGroup({});
  public vali = false;
  public proyectos: proyecto = {
    id: 0,
    nombre: '',
    nombre_Diminutivo: '',
    descripccion: '',
    cliente_Id: 0,
    gerente_Proyecto: '',
    presupuesto: '',
    contrato: '',
    fecha_Inicio: new Date(),
    fecha_Fin: new Date(),
    duracion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date()
  };
  public EDTs: EDT = {
    id: 0,
    numeral: 0,
    nombre_Cuenta: '',
    tipo_Entregable: 0,
    descripcion_Cuenta: '',
    fecha_Entrega: new Date(),
    margen_demora: '',
    estado_Id: 0,
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date(),
  };
  public model: prueba = {
    id: []
  }
    ;

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [

        {
          className: 'col-sm-12',
          type: 'combobox',
          key: 'id',
          templateOptions: {
            label: 'Requisito',
            options: [],
            labelProp: 'descripcion',
            valueProp: 'id',
            multiple: true,
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsRequisitos(field)
          },
        },
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRequisitosAsignarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: EDT, datapro: proyecto }) {
    this.proyectos = data.datapro;
    this.EDTs = data.data;
  }
  Selectrequisitos(): void {
    debugger

  }
  loadOptionsRequisitos(field: FormlyFieldConfig | undefined): void {
    debugger
    this.http.get<Interesado[]>('/Requisito?Proyecto_ID=' + this.proyectos.id).subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarRequisitos() {
    debugger


    this.model.id.forEach((value) => {
      const modelo: Requisitos_Proyecto_Entregables = {
        id: 0,
        requisito_Id: value,
        entregable_Id: this.EDTs.id,
        usuario_Creacion: 0,
        fecha_Creacion: new Date,
      }
      this.http.post<Requisitos_Proyecto_Entregables[]>('/Requisitos_Proyecto_Entregables', modelo).subscribe(result => {
        if (result) {
          this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        } else
          this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
      }, error => console.error(error));
    });
  }
  //guardarActividad() {
  //  debugger
  //  if (this.form2.valid) {
  //    if (this.model.id != 0)
  //      this.http.put<Actividad>('/Actividad', this.model).subscribe(result => {
  //        this.model = result;
  //        this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
  //        this.getdatatable();
  //      }, error => console.error(error));
  //    else {
  //      this.http.post<Actividad[]>('/Actividad', this.model).subscribe(result => {
  //        if (result) {
  //          this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
  //          this.getdatatable();
  //        } else
  //          this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
  //      }, error => console.error(error));
  //    }
  //  }
  //}
  getdatatable() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/EDT/dialog-AsignarEDT-form.html',
})
export class DialogEDTAsignarFormComponent {
  id = 0;
  public list: any[] = [];
  form2 = new FormGroup({});
  public vali = false;
  public proyectos: proyecto = {
    id: 0,
    nombre: '',
    nombre_Diminutivo: '',
    descripccion: '',
    cliente_Id: 0,
    gerente_Proyecto: '',
    presupuesto: '',
    contrato: '',
    fecha_Inicio: new Date(),
    fecha_Fin: new Date(),
    duracion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date()
  };
  public Actividades: Actividad = {
    id: 0,
    lista_Despegable_Actividad: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  };
  public model: prueba = {
    id: []
  }
    ;

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [

        {
          className: 'col-sm-12',
          type: 'combobox',
          key: 'id',
          templateOptions: {
            label: 'EDT',
            options: [],
            labelProp: 'nombre_Cuenta',
            valueProp: 'id',
            multiple: true,
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsRequisitos(field)
          },
        },
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRequisitosAsignarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Actividad, datapro: proyecto }) {
    this.proyectos = data.datapro;
    this.Actividades = data.data;
  }

  loadOptionsRequisitos(field: FormlyFieldConfig | undefined): void {
    debugger
    this.http.get<EDT[]>('/EDT?Proyecto_ID=' + this.proyectos.id).subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarEntregable() {
    this.model.id.forEach((value) => {
      const modelo: Actividades_Proyecto_Entregables = {
        id: 0,
        Actividad_Id: this.Actividades.id,
        entregable_Id: value,
        usuario_Creacion: 0,
        fecha_Creacion: new Date,
      }
      this.http.post<Actividades_Proyecto_Entregables[]>('/Actividades_Proyecto_Entregables', modelo).subscribe(result => {
        if (result) {
          this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
        } else
          this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
      }, error => console.error(error));
      this.getdatatable();
    });
  }
  getdatatable() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Comunicaciones/dialog-Comunicaciones-form.html',
})
export class DialogComunicacionCrearFormComponent {
  id = 0;
  form2 = new FormGroup({});

  public model: Comunicacion = {
    id: 0,
    proceso: '',
    tipo_Comunicacion: 0,
    que: '',
    emisor: '',
    receptor: '',
    como: '',
    caracteristica: '',
    formato: '',
    mecanismoVerificar: '',
    cuando: '',
    registro: '',
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'proceso',
          templateOptions: {
            label: 'Proceso',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'combobox',
          key: 'tipo_Comunicacion',
          templateOptions: {
            label: 'Tipo',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsComunicacion(field)
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'que',
          templateOptions: {
            label: '¿Que?',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'emisor',
          templateOptions: {
            label: 'Emisor',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'receptor',
          templateOptions: {
            label: 'Receptor',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'como',
          templateOptions: {
            label: '¿Como?',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'cuando',
          templateOptions: {
            label: '¿Cuando?',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'registro',
          templateOptions: {
            label: 'Registro',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'caracteristica',
          templateOptions: {
            label: 'Caracteristica',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'formato',
          templateOptions: {
            label: 'Formato',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'mecanismoVerificar',
          templateOptions: {
            label: 'Mecanismo de Verificación',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActividadesCrearFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comunicacion) {
    debugger
    if (data.id > 0)
      this.model = data;
    else
      this.model.proyecto_Id = data.proyecto_Id;
  }
  loadOptionsComunicacion(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=23').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarComunicacion() {
    debugger
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Comunicacion>('/Comunicaciones', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Comunicacion[]>('/Comunicaciones', this.model).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Comunicaciones/dialog-ComunicacionesImportar-form.html',
})
export class DialogComunicacionMasivoFormComponent {
  id = 0;
  public ArchivoExcel: any;
  public archivos: any = []
  public Data: any[] = [];
  public listComunicaciones: any[] = [];
  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  baseUrl = '';
  columnsComunicaciones: MtxGridColumn[] = [
    {
      header: 'Error',
      field: 'error',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Fila',
      field: 'fila',
      sortable: true,
      disabled: true,
      minWidth: 100,
    }

  ];

  public model: Comunicacion = {
    id: 0,
    proceso: '',
    tipo_Comunicacion: 0,
    que: '',
    emisor: '',
    receptor: '',
    caracteristica: '',
    formato: '',
    mecanismoVerificar: '',
    como: '',
    cuando: '',
    registro: '',
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActividadesCrearFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comunicacion) {
    debugger
    if (data.id > 0)
      this.model = data;
    else
      this.model.proyecto_Id = data.proyecto_Id;
  }
  capturarFile(event: any) {
    this.ArchivoExcel = event.target.files[0];
    const archivoCapturado = event.target.files[0]
    this.archivos.push(archivoCapturado);
  }


  guardarComunicacionMasivo() {
    debugger
    try {
      const formularioDeDatos = new FormData();
      for (let file of this.archivos) {
        formularioDeDatos.append("ArchivoExcel", file);
      }
      this.http.post<errores>('/Comunicaciones/Subir?id=' + this.model.proyecto_Id, formularioDeDatos).subscribe((importarcomponentservice) => {
        this.Data = importarcomponentservice.data;

        if (importarcomponentservice.error) {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
        }
        else {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
          this.getdatatable();
        }
        //  console.log(importarcomponentservice.data);

      })
    }
    catch (e) {
      //  console.log('error en la funcion subir archivo: ',e);
    }

  }
  getdatatable() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Riesgos/dialog-Riesgos-form.html',
})
export class DialogRiesgoCrearFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public listEntregables: EDT[] = [];
  public listRiesgos: Riesgo[] = [];
  public list: any[] = [];
  public lisRespuestas: any[] = [];
  public Conseciencia = '';
  public Causa = '';
  public Descripcion = '';
  public resultado = 0;
  public probabilidad = '';
  public impacto_Tiempo = '';
  public impacto_Costo = '';
  public reservaT = '';
  public reservaC = '';

  public model: Riesgo_Proyecto = {
    id: 0,
    riesgo_Id: 0,
    entregable_Id: 0,
    posible_Dueno: '',
    probabilidad: 0,
    impacto_Tiempo: 0,
    impacto_Costo: 0,
    valoracion: '',
    probabilidad_Cuantitativa: 0,
    impacto_Dias_Cuantitativa: 0,
    impacto_Costos_Cuantitativa: 0,
    tipo_respuesta: 0,
    accion_Respuesta: '',
    tiempo_Respuesta: 0,
    costo_Respuesta: 0,
    probabilidad_Residual: 0,
    impacto_Dias_Residual: 0,
    impacto_Costos_Residual: 0,
    tiempo_Reserva: 0,
    costo_Reserva: 0,
    acciones_Contingentes: '',
    proyecto_Id: 0,
    severidad: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActividadesCrearFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Riesgo_Proyecto) {

    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=24').subscribe(result => {

      this.list = result;

    }, error => console.error(error));
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=26').subscribe(result => {
      debugger
      this.lisRespuestas = result;
    }, error => console.error(error));
    if (data.id > 0) {
      this.model = data;
      this.probabilidad = this.model.probabilidad.toString();
      this.impacto_Tiempo = this.model.impacto_Tiempo.toString();
      this.impacto_Costo = this.model.impacto_Costo.toString();
      this.reservaC = this.model.costo_Reserva.toString();
      this.reservaT = this.model.tiempo_Reserva.toString();
      this.http.get<Riesgo>('/Riesgo/detalle?id=' + this.model.riesgo_Id).subscribe(result => {
        this.Causa = result.causa;
        this.Conseciencia = result.consecuencia;
        this.Descripcion = result.descripcion;

      });

    }
    else
      this.model.proyecto_Id = data.proyecto_Id;
    this.loadOptionsEntregables();
    this.loadOptionsRiesgos();

  }
  loadOptionsComunicacion(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=23').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  loadOptionsEntregables(): void {
    this.http.get<EDT[]>('/EDT?Proyecto_Id=' + this.model.proyecto_Id).subscribe(result => {
      this.listEntregables = result;
    }, error => console.error(error));

  }
  SelectRiesgo() {

    if (this.model.riesgo_Id == null) {
      this.Causa = '';
      this.Conseciencia = '';
    }
    else if (this.model.riesgo_Id > 0)
      this.http.get<Riesgo>('/Riesgo/detalle?id=' + this.model.riesgo_Id).subscribe(result => {
        debugger
        this.Causa = result.causa;
        this.Descripcion = result.descripcion;
        this.Conseciencia = result.consecuencia;
      }, error => console.error(error));

  }
  selectCualitativo() {
    this.model.probabilidad = Number.parseInt(this.probabilidad.toString());
    this.model.impacto_Tiempo = Number.parseInt(this.impacto_Tiempo.toString());
    this.model.impacto_Costo = Number.parseInt(this.impacto_Costo.toString());


    if (this.model.probabilidad > 0 && this.model.impacto_Tiempo > 0 && this.model.impacto_Costo > 0) {
      if (this.model.impacto_Tiempo > this.model.impacto_Costo) {
        this.resultado = this.model.probabilidad * this.model.impacto_Tiempo;
      }
      else {
        this.resultado = this.model.probabilidad * this.model.impacto_Costo;
      }
      this.model.severidad = this.resultado;

      if (this.resultado < 3)
        this.model.valoracion = 'Bajo'
      else if (this.resultado < 5)
        this.model.valoracion = 'Medio'
      else
        this.model.valoracion = 'Alto'
    }

  }
  selectReservaContingencia() {


    if (this.model.probabilidad_Cuantitativa > 0 && this.model.impacto_Dias_Residual > 0) {
      this.model.tiempo_Reserva = this.model.probabilidad_Residual * this.model.impacto_Dias_Residual;
      this.reservaT = (this.model.probabilidad_Residual * this.model.impacto_Dias_Residual).toString();
    }
    else {
      this.model.tiempo_Reserva = 0;
      this.reservaT = (0).toString();

    }

    if (this.model.probabilidad_Cuantitativa > 0 && this.model.impacto_Costos_Residual > 0) {
      this.model.costo_Reserva = this.model.probabilidad_Residual * this.model.impacto_Costos_Residual;
      this.reservaC = (this.model.probabilidad_Residual * this.model.impacto_Costos_Residual).toString();
    }
    else {
      this.model.costo_Reserva = 0;
      this.reservaC = (0).toString();
    }

  }
  TabsIndex(index: number) {
    debugger
    console.log(index);
    if (index == 5) {
      this.selectReservaContingencia();
    }
  }
  loadOptionsRiesgos(): void {
    this.http.get<Riesgo[]>('/Riesgo').subscribe(result => {
      this.listRiesgos = result;
    }, error => console.error(error));

  }
  guardarRiesgo() {
    debugger
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Riesgo_Proyecto>('/RiesgoProyecto', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Riesgo_Proyecto[]>('/RiesgoProyecto', this.model).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  getdatatable() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../Proyecto/Riesgos/dialog-RiesgosImportar-form.html',
})
export class DialogRiegosMasivoFormComponent {
  id = 0;
  public ArchivoExcel: any;
  public archivos: any = []
  public Data: any[] = [];
  public listComunicaciones: any[] = [];
  isLoading = false;
  multiSelectable = false;
  rowSelectable = true;
  hideRowSelectionCheckbox = true;
  showToolbar = false;
  columnHideable = false;
  columnSortable = false;
  columnPinnable = false;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  baseUrl = '';
  columnsComunicaciones: MtxGridColumn[] = [
    {
      header: 'Error',
      field: 'error',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Fila',
      field: 'fila',
      sortable: true,
      disabled: true,
      minWidth: 100,
    }

  ];

  public model: Comunicacion = {
    id: 0,
    proceso: '',
    tipo_Comunicacion: 0,
    que: '',
    emisor: '',
    receptor: '',
    como: '',
    cuando: '',
    registro: '',
    caracteristica: '',
    formato: '',
    mecanismoVerificar: '',
    proyecto_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  }

  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogActividadesCrearFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comunicacion) {
    debugger
    if (data.id > 0)
      this.model = data;
    else
      this.model.proyecto_Id = data.proyecto_Id;
  }
  capturarFile(event: any) {
    this.ArchivoExcel = event.target.files[0];
    const archivoCapturado = event.target.files[0]
    this.archivos.push(archivoCapturado);
  }


  guardarComunicacionMasivo() {
    debugger
    try {
      const formularioDeDatos = new FormData();
      for (let file of this.archivos) {
        formularioDeDatos.append("ArchivoExcel", file);
      }
      this.http.post<errores>('/RiesgoProyecto/Subir?id=' + this.model.proyecto_Id, formularioDeDatos).subscribe((importarcomponentservice) => {
        this.Data = importarcomponentservice.data;

        if (importarcomponentservice.error) {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
        }
        else {
          this.snackBar.open(importarcomponentservice.mensaje, 'Cerrar', { duration: 20000 });
          this.getdatatable();
        }
        //  console.log(importarcomponentservice.data);

      })
    }
    catch (e) {
      //  console.log('error en la funcion subir archivo: ',e);
    }

  }
  getdatatable() {
    this.dialogRef.close();
  }
}

export interface proyecto {
  id: number;
  nombre: string;
  nombre_Diminutivo: string;
  descripccion: string;
  cliente_Id: number;
  gerente_Proyecto: string;
  presupuesto: string;
  contrato: string;
  fecha_Inicio: Date;
  fecha_Fin: Date;
  duracion: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}

export interface Interesado {
  id: number;
  nombre: string;
  celular: string;
  correo: string;
  lista_Despegable_Clasificacion: number;
  lista_Despegable_Compromiso: number;
  cargo: string;
  rol: number;
  expectativas: number;
  nivel_Apoyo: string;
  masivo: boolean;
  estado_Id: number;
  proyecto_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  lista_Despegable_expe?: Lista_Despegable;
}

export interface EDT {
  id: number;
  numeral: number,
  tipo_Entregable?: number;
  nombre_Cuenta: string;
  descripcion_Cuenta: string;
  fecha_Entrega?: Date;
  margen_demora: string;
  estado_Id: number;
  proyecto_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}

export interface Requisito {
  id: number;
  proyecto_ID: number;
  descripcion: string;
  lista_Despegable_Requisito: number;
  creador_Documento: string;
  clausula: string;
  fecha_Apertura: Date;
  numeral: number;
  observaciones: string;
  pagina: number;
  estado_Id: number;
  usuario_Creacion: number;
  documento_Referencia: string;
  documento: string;
  responsable: string;
  fecha_Creacion: Date;
  TipoRequisito?: string;
}

export interface Actividad {
  id: number;
  lista_Despegable_Actividad: number;
  nombre: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}

export interface Actividades_Proyecto {
  id: number;
  fecha_Inicial: Date;
  fecha_Final: Date;
  proyecto_ID: number;
  actividad_Id: number;
  requisito_Id: number;
  duracion: string;
  fecha_Entrega: Date;
  numeral: number;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}

export interface Recursos_Proyecto {
  id: number;
  proyecto_ID: number;
  recurso_ID: number;
  cantidad: string;
  costo_Mensual: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  Tipo_id?: number;
  recurso?: Recurso;
}

export interface Recurso {
  id: number;
  lista_Despegable_Tipo: number;
  descripcion: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}
export interface Estado {
  id: number;
  tipo_Id: number;
  nombre: string;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}

export interface Tipo {
  id: number;
  nombre: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}

export interface Lista_Despegable {
  id: number;
  nombre: string;
  tipo_Id: number;
  descripccion: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  estado?: Estado;
  tipo?: Tipo;
}

export interface Riesgo {
  id: number;
  estado_Id: number;
  nombre: string;
  causa: string;
  consecuencia: string;
  descripcion: string,
  codigo: string,
  usuario_Creacion: number;
  fecha_Creacion: Date;
  estado?: Estado;
}

export interface Comunicacion {
  id: number;
  proceso: string;
  tipo_Comunicacion: number;
  que: string;
  emisor: string;
  receptor: string;
  como: string;
  cuando: string;
  registro: string;
  proyecto_Id: number;
  usuario_Creacion: number;
  caracteristica: string;
  formato: string;
  mecanismoVerificar: string;
  fecha_Creacion: Date;
  lista_Despegable?: Lista_Despegable;
}

export interface Riesgo_Proyecto {
  id: number;
  riesgo_Id: number;
  entregable_Id: number;
  posible_Dueno: string;
  probabilidad: number;
  impacto_Tiempo: number;
  impacto_Costo: number;
  valoracion: string;
  probabilidad_Cuantitativa: number;
  impacto_Dias_Cuantitativa: number;
  impacto_Costos_Cuantitativa: number;
  tipo_respuesta: number;
  accion_Respuesta: string;
  tiempo_Respuesta: number;
  costo_Respuesta: number;
  probabilidad_Residual: number;
  impacto_Dias_Residual: number;
  impacto_Costos_Residual: number;
  tiempo_Reserva: number;
  costo_Reserva: number;
  acciones_Contingentes: string;
  proyecto_Id: number;
  usuario_Creacion: number;
  severidad: number;
  fecha_Creacion: Date;
  riesgos?: Riesgo;
  edt?: EDT;
}
export interface prueba {
  id: number[];
}
export interface Requisitos_Proyecto_Entregables {
  id: number;
  requisito_Id: number;
  entregable_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}
export interface Actividades_Proyecto_Entregables {
  id: number;
  Actividad_Id: number;
  entregable_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}

export interface Intervalo_actividades {
  id: number;
  actividad_Proyecto_Id: number;
  fecha_Inicio: Date;
  fecha_Fin: Date;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}
export interface errores {
  error: string;
  mensaje: string;
  data: ErroresMasvo[];
}
export interface ErroresMasvo {
  fila: number;
  error: string;
}



export interface Comunicacionexp {
  Proyecto: string;
  Proceso: string;
  Tipo_Comunicacion: string;
  Que: string;
  Emisor: string;
  Receptor: string;
  Como: string;
  Cuando: string;
  Registro: string;
  Caracteristica: string;
  Formato: string;
  MecanismoVerificar: string;
}

export interface Interesadoexp {
  Proyecto: string;
  Nombre: string;
  Celular: string;
  Correo: string;
  Clasificacion: string;
  Compromiso: string;
  Cargo: string;
  Rol: string;
  Expectativas: string;
  Nivel_Apoyo: string;
}
export interface Requisitoexp {
  Proyecto: string;
  Descripcion: string;
  Requisito: string;
  Creador_Documento: string;
  Clausula: string;
  Numeral: string;
  Observaciones: string;
  Pagina: string;
  Documento: string;
  Responsable: string;
}
export interface Riesgoexp {
  Proyecto: string;
  Nombre: string;
  Causa: string;
  Consecuencia: string;
  Descripcion: string,
  Codigo: string,
  Entregable: number;
  Posible_Dueno: string;
  Probabilidad_Cualitativo: number;
  Impacto_Tiempo_Cualitativo: number;
  Impacto_Costo_Cualitativo: number;
  Severidad: number;
  Valoracion: string;
  Probabilidad_Cuantitativa: number;
  Ïmpacto_Dias_Cuantitativa: number;
  Impacto_Costos_Cuantitativa: number;
  Respuesta: number;
  Accion_Respuesta: string;
  Tiempo_Respuesta: number;
  Costo_Respuesta: number;
  Probabilidad_Residual: number;
  Impacto_Dias_Residual: number;
  Impacto_Costos_Residual: number;
  Tiempo_Reserva: number;
  Costo_Reserva: number;
  Acciones_Contingentes: string;
}
