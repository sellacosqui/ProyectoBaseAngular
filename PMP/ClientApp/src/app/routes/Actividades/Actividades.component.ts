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
  selector: 'app-Actividades',
  templateUrl: './Actividades.component.html',
  styleUrls: ['./Actividades.component.scss'],
  //providers: [TablesDataService],
})

export class ActividadesComponent implements OnInit {

  
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
      header: 'Estado',
      field: 'estado.nombre',
      minWidth: 100,
    },
    {
      header: 'Tipo',
      field: 'lista_Despegable.nombre',
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
          click: record => this.openActividadDialogData(record),
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
          click: record => this.openActividadDialogData(record),
        },
      ],
    }
  ];
  public list: any[] = [];
  public Actividades: Actividad[] = [];
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

  public actividad: Actividad = {
    id: 0,
    lista_Despegable_Actividad: 0,
    nombre: '',
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
    this.http.get<Actividad[]>('/Actividad').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: Actividad) {
    //this.route.navigate(['../Recurso/datos',  datos.id]);
  }
  eliminar(datos: Actividad) {

    this.http.delete<Actividad[]>('/Actividad?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
          };
        }, error => console.error(error));

 
  }
  getdatatable(data: Actividad[]) {
    this.Actividades = data;
    this.list = this.Actividades;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }
  openActividadDialog() {
    const dialogoRecurso = this.dialog.open(DialogActividadesFormComponent, { data: this.actividad });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  openActividadDialogData(datare: Actividad) {
    debugger
    const dialogoRecurso = this.dialog.open(DialogActividadesFormComponent, { data: datare });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }

  ver(datos: Actividad) {
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
  templateUrl: '../Actividades/dialog-Actividades-form.html',
})
export class DialogActividadesFormComponent {
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
    public dialogRef: MatDialogRef<DialogActividadesFormComponent>,
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

export interface Actividad {
  id: number;
  lista_Despegable_Actividad: number;
  nombre: string;
  estado_Id: number;
  usuario_Creacion: number;
  fecha_Creacion: Date;
}
