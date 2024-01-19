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
  selector: 'Clientes',
  templateUrl: './Clientes.component.html',
  styleUrls: ['./Clientes.component.scss'],
  //providers: [TablesDataService],
})

export class ClientesComponent implements OnInit {

  
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
      header: 'Apellido',
      field: 'apellido',
      minWidth: 100,
    },
    {
      header: 'Nombre de Contacto',
      field: 'nombre_Contacto',
      minWidth: 100,
    },
    {
      header: 'Correo de Contacto',
      field: 'correo_Contacto',
      minWidth: 100,
    },
    {
      header: 'Documento',
      field: 'documento',
      minWidth: 100,
    },
    {
      header: 'Correo',
      field: 'correo',
      minWidth: 100,
    },
    {
      header: 'Celular',
      field: 'celular',
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
          click: record => this.openUsuarioDialogData(record),
        },
        //{
        //  type: 'icon',
        //  text: 'Eliminar',
        //  icon: 'delete',
        //  color: 'warn',
        //  click: record => this.eliminar(record),
        //},
        {
          type: 'icon',
          text: 'Vista',
          icon: 'visibility',
          click: record => this.openUsuarioDialogData(record),
        },
      ],
    }
  ];
  public list: any[] = [];
  public usuarios: Cliente[] = [];
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
  public usuario: Cliente = {
    id: 0,
    lista_Despegable_Tipo: 0,
    nombre: '',
    apellido: '',
    nombre_Contacto: '',
    correo_Contacto: '',
    documento: '',
    correo: '',
    celular: '',
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
    this.http.get<Cliente[]>('/Cliente').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: Cliente) {
    //this.route.navigate(['../Recurso/datos',  datos.id]);
  }
  eliminar(datos: Cliente) {

    this.http.delete<Cliente[]>('/Cliente?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
          };
        }, error => console.error(error));

 
  }
  getdatatable(data: Cliente[]) {
    this.usuarios = data;
    this.list = this.usuarios;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }
  openUsuarioDialog() {
    const dialogoUsaurio = this.dialog.open(DialogClientesFormComponent, { data: this.usuario });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  openUsuarioDialogData(datare: Cliente) {
    debugger
    const dialogoUsaurio = this.dialog.open(DialogClientesFormComponent, { data: datare });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  ver(datos: Cliente) {
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
  templateUrl: '../Clientes/dialog-Clientes-form.html',
})
export class DialogClientesFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public model: Cliente = {
    id: 0,
    lista_Despegable_Tipo: 0,
    nombre: '',
    apellido: '',
    nombre_Contacto: '',
    correo_Contacto: '',
    documento: '',
    correo: '',
    celular: '',
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
          type: 'input',
          key: 'apellido',
          templateOptions: {
            label: 'Apellido',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'nombre_Contacto',
          templateOptions: {
            label: 'Nombre de Contacto',
            required: false,
            maxLength: 100,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'correo_Contacto',
          templateOptions: {
            label: 'Correo de Contacto',
            required: false,
            maxLength: 100,
            minLength: 0,
            pattern: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]',
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => 'Correo no valido',
            },
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-4',
          type: 'input',
          key: 'documento',
          templateOptions: {
            label: 'Documento',
            required: false,
            maxLength: 20,
            minLength: 0
          },
        },
        {
          className: 'col-sm-4',
          type: 'input',
          key: 'correo',
          templateOptions: {
            label: 'Correo',
            required: false,
            maxLength: 100,
            minLength: 0,
            pattern: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]',
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => 'Correo no valido',
            },
          },
        },
        {
          className: 'col-sm-4',
          type: 'input',
          key: 'celular',
          templateOptions: {
            label: 'Celular',
            maxLength: 15,
            minLength: 0,
            required: false,
          },
        }
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogClientesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente) {
    if (data.id > 0)
      this.model = data;
    else
      this.model.lista_Despegable_Tipo = 1;
  }
  guardarUsuario() {
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Cliente>('/Cliente', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Cliente[]>('/Cliente', this.model).subscribe(result => {
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

export interface Estado {
  id: number;
  tipo_Id: number;
  nombre: string;
  usuario_Creacion: number;
  fecha_Creacion: Date;
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
  estado?: Estado;
}
