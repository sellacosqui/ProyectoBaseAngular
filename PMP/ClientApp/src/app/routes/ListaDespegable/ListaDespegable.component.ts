import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

//import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridColumnButton } from '@ng-matero/extensions/grid';

//import { TablesDataService } from '../data.service';
//import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'ListaDespegable',
  templateUrl: './ListaDespegable.component.html',
  styleUrls: ['./ListaDespegable.component.scss'],
  //providers: [TablesDataService],
})

export class ListaDespegableComponent implements OnInit {

  
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
      header: 'Tipo',
      field: 'tipo.nombre',
      minWidth: 100,
    },
    {
      header: 'Descripccion',
      field: 'descripccion',
      minWidth: 100,
    },
    {
      header: 'Estado',
      field: 'estado.nombre',
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
          click: record => this.openListaDespegableDialogData(record),
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
          click: record => this.openListaDespegableDialogData(record),
        },
      ],
    }
  ];
  public list: any[] = [];
  public usuarios: Lista_Despegable[] = [];
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
  public ListaDespegable: Lista_Despegable = {
    id: 0,
    nombre: '',
    tipo_Id: 0,
    descripccion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,

  }



  constructor(
    private cdr: ChangeDetectorRef,
    public http: HttpClient,
    private snackBar: MatSnackBar,
    private route: Router,
    public dialog: MatDialog  ) {
  }

  getdata() {
    this.http.get<Lista_Despegable[]>('/ListaDespegable').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: Lista_Despegable) {
    //this.route.navigate(['../Recurso/datos',  datos.id]);
  }
  eliminar(datos: Lista_Despegable) {

    this.http.delete<Lista_Despegable[]>('/ListaDespegable?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
          };
        }, error => console.error(error));

 
  }
  getdatatable(data: Lista_Despegable[]) {
    this.usuarios = data;
    this.list = this.usuarios;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }
  openListaDespegableDialog() {
    const dialogoUsaurio = this.dialog.open(DialogListaDespegablFormComponent, { data: this.ListaDespegable });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  openListaDespegableDialogData(datare: Lista_Despegable) {
    debugger
    const dialogoUsaurio = this.dialog.open(DialogListaDespegablFormComponent, { data: datare });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  ver(datos: Lista_Despegable) {
    //this.route.navigate(['../Proyectos/Proyectos', datos.id]);
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




@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: '../ListaDespegable/dialog-ListaDespegable-form.html',
})
export class DialogListaDespegablFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public model: Lista_Despegable = {
    id: 0,
    nombre: '',
    tipo_Id: 0,
    descripccion: '',
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
          type: 'input',
          key: 'nombre',
          templateOptions: {
            label: 'Nombre',
            required: true,
          },
        },
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'descripccion',
          templateOptions: {
            type: 'textarea',
            rows:4,
            label: 'Descripción',
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
          type: 'combobox',
          key: 'tipo_Id',
          templateOptions: {
            label: 'Tipo ',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsTipos(field)
          },
        },
       
      ],
    },
  
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogListaDespegablFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lista_Despegable) {
    if (data.id > 0)
      this.model = data;
    else
      this.model.estado_Id = 1;
  }
  guardarListaDespegable() {
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Lista_Despegable>('/ListaDespegable', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Lista_Despegable[]>('/ListaDespegable', this.model).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  loadOptionsTipos(field: FormlyFieldConfig | undefined): void {
    this.http.get<Tipo[]>('/Tipo').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  getdatatable() {
    this.dialogRef.close();
  }
}
//export interface Usuario {
//  id: number;
//  usuario: string;
//  pass: string;
//  nombre: string;
//  apellidos: string;
//  email: string;
//  documento: string;
//  estado_Id: number;
//  cliente_Id: number;
//  usuario_Creacion: number;
//  fecha_Creacion: Date;
//  estado?: any;
//  cliente?: any;
//}

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


//export interface Recurso {
//  id: number;
//  lista_Despegable_Tipo: number;
//  descripcion: string;
//  estado_Id: number;
//  usuario_Creacion: number;
//  fecha_Creacion: Date;
//}
