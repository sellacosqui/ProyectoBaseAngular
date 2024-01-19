import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

//import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridColumnButton } from '@ng-matero/extensions/grid';

import { TablesDataService } from '../data.service';
//import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'ProyectosList',
  templateUrl: './ProyectosList.component.html',
  styleUrls: ['./ProyectosList.component.scss'],
  providers: [TablesDataService],
})

export class ProyectosListComponent implements OnInit {

  
  columns: MtxGridColumn[] = [
    {
      header: 'ID',
      field: 'id',
      sortable: true,
      minWidth: 100,
    },
    {
      header: 'Nombre',
      field: 'nombre',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Nombre Diminutivo',
      field: 'nombre_Diminutivo',
      minWidth: 100,
    },
    {
      header: 'Descripccion',
      field: 'descripccion',
      minWidth: 100,
    },
    {
      header: 'Nombre Cliente',
      field: 'cliente.nombre',
      minWidth: 100,
    },
    {
      header: 'Gerente',
      field: 'gerente_Proyecto',
      hide: true,
      minWidth: 120,
    },
    {
      header: 'Presupuesto',
      field: 'presupuesto',
      minWidth: 120,
      width: '120px',
    },
    {
      header: 'Contrato',
      field: 'contrato',
      minWidth: 180,
    },
    {
      header: 'Fecha inicio',
      field: 'fecha_Inicio',
      typeParameter: { format: 'myd' },
      minWidth: 120,
    },
    {
      header: 'Fecha fin',
      field: 'fecha_Fin',
      minWidth: 120,
    },
    {
      header: 'Estado',
      field: 'estado.nombre',
      minWidth: 120,
    },
    {
      header: 'Duracion',
      field: 'duracion',
      minWidth: 180,
      width: '100px',
    },
    {
      header: 'Opciones',
      field: 'operation',
      width: '160px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        //{
        //  type: 'icon',
        //  text: 'delete',
        //  icon: 'attach_file',
        //  click: record => this.datos(record),
        //},
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          click: record => this.datos(record),
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
          click: record => this.ver(record),
        },
      ],
    }
  ];
  public list: any[] = [];
  public proyectos: proyecto[] = [];
  isLoading = true;
  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  baseUrl = '';
  public DialogoEliminar = '';




  constructor(
    //private translate: TranslateService,
    private dataSrv: TablesDataService,
    //public dialogs: MtxDialog,
    private cdr: ChangeDetectorRef,
    public http: HttpClient,
    private snackBar: MatSnackBar,
    private route: Router,
    public dialog: MatDialog  ) {
  }

  getdata() {
    this.http.get<proyecto[]>('/proyect').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: proyecto) {
    this.route.navigate(['../Proyectos/datos',  datos.id]);
  }
  eliminar(datos: proyecto) {
    //const dialogRef = this.dialog.open(DialogEliminaromponent);
    //dialogRef.afterClosed().subscribe(result => {
      //console.log('a')
      //if (result == 'true') {
        this.http.delete<proyecto[]>('/proyect?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
            //pop
          };
        }, error => console.error(error));
      //}
//});
 
  }
  getdatatable(data: proyecto[]) {
    this.proyectos = data;
    this.list = this.proyectos;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }

  ver(datos: proyecto) {
    this.route.navigate(['../Proyectos/Proyectos', datos.id]);
  }


  ngOnInit() {
    this.getdata();
    console.log(this.list);
  }

  delete(value: any) {
    //this.dialogs.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

 
}

// Dialog
@Component({
  selector: 'dialog- fruit',
  templateUrl: '/dialog-Eliminar.html',
})
export class DialogEliminaromponent { }

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
  cliente: Cliente;
  Estado: Estado;
}


export interface Estado {
  id: number;
  tipo_Id: number;
  nombre: string;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  tipo?: any;
}
export interface Cliente {
  id: number;
  lista_Despegable_Tipo: number;
  nombre: string;
  apellido: string;
  nombre_Contacto: string;
  correo_Contacto: string;
  documento: string;
  correo: string;
  celular: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  lista_Despegable?: any;
  estado: Estado;
}
