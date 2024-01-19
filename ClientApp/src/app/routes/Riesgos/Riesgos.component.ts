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
  selector: 'Riesgos',
  templateUrl: './Riesgos.component.html',
  styleUrls: ['./Riesgos.component.scss'],
  //providers: [TablesDataService],
})

export class RiesgosComponent implements OnInit {

  
  columns: MtxGridColumn[] = [
    {
      header: 'Nombre',
      field: 'nombre',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: 'Causa',
      field: 'causa',
      minWidth: 100,
    },
    {
      header: 'Consecuencia',
      field: 'consecuencia',
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
          click: record => this.openRiesgoDialogData(record),
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
          click: record => this.openRiesgoDialogData(record),
        },
      ],
    }
  ];
  public list: any[] = [];
  public Riesgos: Riesgo[] = [];
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
  public recurso: Riesgo = {
    id: 0,
    estado_Id: 0,
    nombre: '',
    causa: '',
    codigo: '',
    descripcion: '',
    consecuencia: '',
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
    this.http.get<Riesgo[]>('/Riesgo').subscribe(result => {
      this.getdatatable(result)
    }, error => console.error(error));
  }
  datos(datos: Riesgo) {
    //this.route.navigate(['../Recurso/datos',  datos.id]);
  }
  eliminar(datos: Riesgo) {

    this.http.delete<Riesgo[]>('/Riesgo?id=' + datos.id).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha eliminado correctamente', 'Cerrar', { duration: 2000 });
            this.getdata();
          }
          else {
          };
        }, error => console.error(error));

 
  }
  getdatatable(data: Riesgo[]) {
    this.Riesgos = data;
    this.list = this.Riesgos;
    this.isLoading = false;
  this.snackBar.open('Se ha refrescado la lista correctamente', 'Cerrar', { duration: 2000 });

  }

  ver(datos: Riesgo) {
    //this.route.navigate(['../Proyectos/Proyectos', datos.id]);
  }
  openRiesgoDialog() {
    const dialogoRecurso = this.dialog.open(DialogRiesgosFormComponent, { data: this.recurso });
    dialogoRecurso.beforeClosed().subscribe(result => {
      this.getdata();
    })
  }
  openRiesgoDialogData(datare: Riesgo) {
    debugger
    const dialogoRecurso = this.dialog.open(DialogRiesgosFormComponent, { data: datare });
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
  templateUrl: '../Riesgos/dialog-Riesgos-form.html',
})
export class DialogRiesgosFormComponent {
  id = 0;
  form2 = new FormGroup({});
  public model: Riesgo = {
    id: 0,
    estado_Id: 0,
    nombre: '',
    causa: '',
    codigo: '',
    descripcion: '',
    consecuencia: '',
    usuario_Creacion:0 ,
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
            maxLength: 250,
            required: true,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'causa',
          templateOptions: {
            type: 'textarea',
            rows: 5,
            label: 'Causa',
            maxLength: 700,
            required: true,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'consecuencia',
          templateOptions: {
            type: 'textarea',
            rows: 5,
            label: 'Consecuencia',
            maxLength: 700,
            required: true,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'input',
          key: 'codigo',
          templateOptions: {
            label: 'Codígo',
            maxLength: 250,
            required: true,
            minLength: 0
          },
        },
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'descripcion',
          templateOptions: {
            type: 'textarea',
            rows: 6,
            label: 'Descripción',
            maxLength: 1000,
            required: true,
            minLength: 0
          },
        },
      ],
    },
  ];
  constructor(public http: HttpClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogRiesgosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Riesgo) {
    if (data.id > 0)
      this.model = data;
  }

  
  guardarRiesgos() {
    debugger
    if (this.form2.valid) {
      if (this.model.id != 0)
        this.http.put<Riesgo>('/Riesgo', this.model).subscribe(result => {
          this.model = result;
          this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
          this.getdatatable();
        }, error => console.error(error));
      else {
        this.http.post<Riesgo[]>('/Riesgo', this.model).subscribe(result => {
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


export interface Riesgo {
  id: number;
  estado_Id: number;
  nombre: string;
  causa: string;
  consecuencia: string;
  codigo: string;
  descripcion: string;
  usuario_Creacion: number;
  fecha_Creacion: Date;
  estado?: Estado;
}

