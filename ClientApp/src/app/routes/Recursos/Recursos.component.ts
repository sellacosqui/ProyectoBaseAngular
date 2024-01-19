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
  selector: 'Recursos',
  templateUrl: './Recursos.component.html',
  styleUrls: ['./Recursos.component.scss'],
  //providers: [TablesDataService],
})

export class RecursosComponent implements OnInit {

  
  columns: MtxGridColumn[] = [
    {
      header: 'ID',
      field: 'id',
      sortable: true,
      minWidth: 100,
    },
    {
      header: 'Tipo',
      field: 'lista_Despegable.nombre',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Descripcion',
      field: 'descripcion',
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
          click: record => this.openRecursoDialogData(record),
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
          click: record => this.openRecursoDialogData(record),
        },
      ],
    }
  ];
  public list: any[] = [];
  public Recurso: Recurso[] = [];
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
  public recurso: Recurso = {
    id: 0,
    lista_Despegable_Tipo: 0,
    descripcion: '',
    estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date,
  };



  constructor(
    private cdr: ChangeDetectorRef,
    public http: HttpClient,
    private snackBar: MatSnackBar,
    private route: Router,
    public dialog: MatDialog  ) {
  }

  getdata() {
    this.http.get<Recurso[]>('/Recurso').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: Recurso) {
    //this.route.navigate(['../Recurso/datos',  datos.id]);
  }
  eliminar(datos: Recurso) {

    this.http.delete<Recurso[]>('/Recurso?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
          };
        }, error => console.error(error));

 
  }
  getdatatable(data: Recurso[]) {
    this.Recurso = data;
    this.list = this.Recurso;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }

  ver(datos: Recurso) {
    //this.route.navigate(['../Proyectos/Proyectos', datos.id]);
  }
  openRecursoDialog() {
    const dialogoRecurso = this.dialog.open(DialogRecursosFormComponent, { data: this.recurso });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  openRecursoDialogData(datare: Recurso) {
    debugger
    const dialogoRecurso = this.dialog.open(DialogRecursosFormComponent, { data: datare });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.getdata();
    })
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
  templateUrl: '../Recursos/dialog-Recursos-form.html',
})
export class DialogRecursosFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public model:  Recurso = {
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
            rows:3,
            minLength: 0
          },
        },
       
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRecursosFormComponent>,
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
