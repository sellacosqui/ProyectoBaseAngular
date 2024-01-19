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
  selector: 'Roles',
  templateUrl: './Roles.component.html',
  styleUrls: ['./Roles.component.scss'],
  //providers: [TablesDataService],
})

export class RolesComponent implements OnInit {

  
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
      field: 'lista_Despegable.nombre',
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
          click: record => this.openRolDialogData(record),
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
          click: record => this.openRolDialogData(record),
        },
      ],
    }
  ];
  public list: any[] = [];
  public proyectos: Rol[] = [];
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

  public rol: Rol = {
    id: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
    tipo_Rol:0
  }


  constructor(
    private cdr: ChangeDetectorRef,
    public http: HttpClient,
    private snackBar: MatSnackBar,
    private route: Router,
    public dialog: MatDialog  ) {
  }

  getdata() {
    this.http.get<Rol[]>('/Rol').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: Rol) {
    //this.route.navigate(['../Recurso/datos',  datos.id]);
  }
  openRolDialog() {
    const dialogoUsaurio = this.dialog.open(DialogRolesFormComponent, { data: this.rol });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  openRolDialogData(datare: Rol) {
    debugger
    const dialogoUsaurio = this.dialog.open(DialogRolesFormComponent, { data: datare });
    dialogoUsaurio.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  eliminar(datos: Rol) {

    this.http.delete<Rol[]>('/Rol?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
          };
        }, error => console.error(error));

 
  }
  getdatatable(data: Rol[]) {
    this.proyectos = data;
    this.list = this.proyectos;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }

  ver(datos: Rol) {
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
  templateUrl: '../Roles/dialog-Roles-form.html',
})
export class DialogRolesFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public model: Rol = {
    id: 0,
    nombre: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
    tipo_Rol: 0,
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
            maxLength: 50,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'combobox',
          key: 'tipo_Rol',
          templateOptions: {
            label: 'Tipo Rol',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptions(field)
          },
        }
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRolesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rol) {
    if (data.id > 0)
      this.model = data;
    else
      this.model.estado_Id = 1;
  }
  loadOptions(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/ListaDespegable/Tipos?tipo=21').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }
  guardarRol() {
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Rol>('/Rol', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Rol[]>('/Rol', this.model).subscribe(result => {
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
  tipo?: any;
}

export interface Rol {
  id: number;
  nombre: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  estado?: Estado;
  tipo_Rol: number;
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
export interface Tipo {
  id: number;
  nombre: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}
