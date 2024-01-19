import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { log } from 'console';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { startWith } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-forms-dynamic',
  templateUrl: './ProyectoDatos.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProyectoDatosComponent implements OnInit {


  // Advanced Layout
  form2 = new FormGroup({});
  da = Date;
  public prueba = '';
  public id = 0;
  public proyectos: proyecto ={
      id: 0,
      nombre: '',
      nombre_Diminutivo: '',
      descripccion: '',
      cliente_Id: 0,
      gerente_Proyecto: '',
      presupuesto: '0',
    contrato: '',
    //fecha_Inicio: new Date,
    //fecha_Fin: new Date,
      duracion: '',
      estado_Id: 0,
    usuario_Creacion: 0,
    fecha_Creacion: new Date
  };
 /* public proyec: proyecto = { };*/
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
            maxLength: 100,
            minLength:0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'nombre_Diminutivo',
          templateOptions: {
            label: 'Diminutivo',
            required: true,
            maxLength: 20,
            minLength: 0,
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-12',
          type: 'textarea',
          key: 'descripccion',
          templateOptions: {
            label: 'Descripccion',
            theme: "custom",
            type: 'textarea',
            required: true,
            maxLength: 250,
            minLength: 0,
            rows:4,
            grow: true
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
          key: 'gerente_Proyecto',
          templateOptions: {
            label: 'Gerente de Proyecto',
            maxLength: 100,
            required: true,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'presupuesto',
          templateOptions: {
            type: 'int',
            label: 'Presupuesto',
            min: 0,
            max: 0,
            
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'contrato',
          templateOptions: {
            label: 'Contrato',
            maxLength: 100,
            required: true,
            minLength: 0
          },
        },
        {
          className: 'col-sm-6',
          type: 'select',
          key: 'cliente_Id',
          templateOptions: {
            label: 'Cliente',
            options: [],
            labelProp: 'nombre',
            valueProp: 'id',
            required: true,
          },
          hooks: {
            onInit: (field) => this.loadOptionsCliente(field)
          },
        },
      ],
    },
    
  ];

  constructor(private toast: ToastrService, public http: HttpClient,
    private snackBar: MatSnackBar, private route: Router, private roueteacti: ActivatedRoute) {
    console.log(this.roueteacti.snapshot.paramMap.get('id'));
    if (this.roueteacti.snapshot.paramMap.get('id') != null) {
      this.id = Number(this.roueteacti.snapshot.paramMap.get('id')?.toString());
      console.log(this.id);
    }
    else {

    }
  }

  calulardias(field?: FormlyFieldConfig, event?: any) {
    debugger

    if (this.proyectos.fecha_Inicio != null && this.proyectos.fecha_Fin != null) {
      var fechaInicio = new Date(this.proyectos.fecha_Inicio.toString()).getTime();
      var fechaFin = new Date(this.proyectos.fecha_Fin.toString()).getTime();

      var diff = fechaInicio - fechaFin;
      var duracion = (((diff / (1000 * 60 * 60 * 24) )*-1).toString() + ' Días');
      this.proyectos.duracion = ((diff / (1000 * 60 * 60 * 24) * -1).toString() + ' Días');
      this.snackBar.open('La Duración del proyecto sera de ' + duracion, 'Cerrar', { duration: 5000 });
    }
  }

  loadOptionsCliente(field: FormlyFieldConfig | undefined): void {
    this.http.get<Lista_Despegable[]>('/Cliente').subscribe(result => {
      if (!field || !field.templateOptions) {
        return;
      }
      field.templateOptions.options = result;
    }, error => console.error(error));

  }

  ngOnInit() {

      console.log(this.id);
    if (this.id != 0) {
      this.http.post<proyecto>('/proyect/detalle?id=' + this.id, String).subscribe(result => {
        console.log(result);

        this.proyectos = result;
        this.fields2.push(
         
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-sm-6',
                type: "datepicker",
                key: "fecha_Inicio",
                templateOptions: {
                  datepickerOptions: {
                    min: new Date(),
                    dateChange: () => this.calulardias(),
                  },
                  //change: (field) => this.calulardias(field),
                  label: 'Fecha Inicio',
                  required: true,
                },
              },
              {
                className: 'col-sm-6',
                type: 'datepicker',
                key: 'fecha_Fin',
                templateOptions: {
                  label: 'Fecha Fin',
                  datepickerOptions: {
                    dateChange: () => this.calulardias(),
                    //min: 'proyectos.fecha_Inicio',
                  },
                  //change: (field) => this.calulardias(field),
                  required: true,
                },
                expressionProperties: { 'templateOptions.datepickerOptions.min': 'model.fecha_Inicio', }
              },
            ],
          }
        );

        const area = document.getElementById(`Nombre_Proyecto`) as HTMLTitleElement;
        area.text = 'Proyecto:' + result.nombre_Diminutivo;
      }, error => console.error(error));
      
    }
    else {
      this.fields2.push(

        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-sm-6',
              type: "datepicker",
              key: "fecha_Inicio",
              templateOptions: {
                datepickerOptions: {
                    dateChange: () => this.calulardias(),
                  min: new Date(),
                },

                label: 'Fecha Inicio',
                required: true,
              },
            },
            {
              className: 'col-sm-6',
              type: 'datepicker',
              key: 'fecha_Fin',
              templateOptions: {
                label: 'Fecha Fin',
                datepickerOptions: {
                  dateChange: () => this.calulardias(),
                },
                required: true,
              },
              expressionProperties: {
                'templateOptions.datepickerOptions.min': 'model.fecha_Inicio',
                //'templateOptions.disabled': '!model.fecha_Inicio',
              }
            },
          ],
        }
      );

      const area = document.getElementById(`Nombre_Proyecto`) as HTMLTitleElement;
      area.text = 'Nuevo Proyecto:' ;
    }

  }

  validation() {
    this.fields2;
    if (this.proyectos.fecha_Inicio != null && this.proyectos.fecha_Fin != null)
    if (this.proyectos.fecha_Inicio > this.proyectos.fecha_Fin)
      this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
  }
  submit2() {
    if (this.form2.valid) {
      if (this.id != 0)
        this.http.put<proyecto>('/proyect', this.proyectos).subscribe(result => {
          console.log(result);
            this.snackBar.open('Se ha Modificado correctamente', 'Cerrar', { duration: 2000 });
            this.proyectos = result;
            this.getdatatable();
        }, error => console.error(error));
      else {
        console.log(this.proyectos);
        this.http.post<proyecto[]>('/proyect', this.proyectos).subscribe(result => {
          if (result) {
            this.snackBar.open('Se ha creado correctamente', 'Cerrar', { duration: 2000 });
            this.getdatatable();
          } else
            this.snackBar.open('No se ha creado correctamente', 'Cerrar', { duration: 2000 });
        }, error => console.error(error));
      }
    }
  }
  cancelar() {
    //console.log('hola');
    //console.log(this.proyectos);
    this.route.navigate(['../Proyectos/list']);
    }
  

  getdatatable() {
    this.route.navigate(['../Proyectos/list']);
  }

  showToast(obj: proyecto) {
    this.toast.success(JSON.stringify(obj));
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
  fecha_Inicio?: Date;
  fecha_Fin?: Date;
  duracion: string;
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
