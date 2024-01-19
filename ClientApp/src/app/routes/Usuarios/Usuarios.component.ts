import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailValidator, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

//import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridColumnButton } from '@ng-matero/extensions/grid';

//import { TablesDataService } from '../data.service';
//import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'Usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.scss'],
  //providers: [TablesDataService],
})

export class UsuariosComponent implements OnInit {

  
  columns: MtxGridColumn[] = [
    {
      header: 'ID',
      field: 'id',
      sortable: true,
      minWidth: 100,
    },
    {
      header: 'Usuario',
      field: 'usuario',
      sortable: true,
      disabled: true,
      minWidth: 100,
      
    },
    {
      header: 'Nombre',
      field: 'nombre',
      minWidth: 100,
    },
    {
      header: 'Apellidos',
      field: 'apellidos',
      minWidth: 100,
    },
    {
      header: 'Correo',
      field: 'email',
      minWidth: 100,
    },
    {
      header: 'Documento',
      field: 'documento',
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
  public usuarios: Usuario[] = [];
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
  public usuario: Usuario = {
    id: 0,
    usuario: '',
    pass: '',
    nombre: '',
    apellidos: '',
    email: '',
    documento: '',
    estado_Id: 0,
    cliente_Id: 0,
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
    this.http.get<Usuario[]>('/Usuario').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: Usuario) {
    //this.route.navigate(['../Recurso/datos',  datos.id]);
  }
  eliminar(datos: Usuario) {

    this.http.delete<Usuario[]>('/Usuario?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
          };
        }, error => console.error(error));

 
  }
  getdatatable(data: Usuario[]) {
    this.usuarios = data;
    this.list = this.usuarios;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }
  openUsuarioDialog() {
    const dialogoUsaurio = this.dialog.open(DialogUsuariosFormComponent, { data: this.usuario });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  openUsuarioDialogData(datare: Usuario) {
    debugger
    const dialogoUsaurio = this.dialog.open(DialogUsuariosFormComponent, { data: datare });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  ver(datos: Usuario) {
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
  templateUrl: '../Usuarios/dialog-Usuarios-form.html',
})
export class DialogUsuariosFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public model: Usuario = {
    id: 0,
    usuario: '',
    pass: '',
    nombre: '',
    apellidos: '',
    email: '',
    documento: '',
    estado_Id: 0,
    cliente_Id: 0,
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
          key: 'usuario',
          templateOptions: {
            label: 'Usuario',
            required: true,
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'pass',
          templateOptions: {
            type: 'password',
            label: 'contraseña',
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
          key: 'apellidos',
          templateOptions: {
            label: 'Apellidos',
            maxLength: 50,
            minLength: 0,
            required: true,
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
          key: 'email',
          templateOptions: {
            label: 'Correo',
            required: true,
            pattern: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]',
            //pattern: '[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]',
            maxLength: 100,
            minLength: 0,
            type: 'email',
            placeholder: 'Correo',
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => 'Correo no valido',
            },
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'documento',
          templateOptions: {
            label: 'Documento',
            required: true,
            maxLength: 30,
            minLength: 0
          },
        }

      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogUsuariosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) {
    if (data.id > 0)
      this.model = data;
    else
      this.model.cliente_Id = 2;
  }
  //EmailValidator(control: FormControl | any): ValidationErrors | null {
  //  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  //    .test(control.value) ? null : { 'email': true };
  //}
  guardarUsuario() {
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Usuario>('/Usuario', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Usuario[]>('/Usuario', this.model).subscribe(result => {
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
export interface Usuario {
  id: number;
  usuario: string;
  pass: string;
  nombre: string;
  apellidos: string;
  email: string;
  documento: string;
  estado_Id: number;
  cliente_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  estado?: any;
  cliente?: any;
}

//export interface Recurso {
//  id: number;
//  lista_Despegable_Tipo: number;
//  descripcion: string;
//  estado_Id: number;
//  usuario_Creacion: number;
//  fecha_Creacion: Date;
//}
