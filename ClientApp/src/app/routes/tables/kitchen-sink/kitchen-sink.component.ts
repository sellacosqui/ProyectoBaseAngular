import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';

import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss'],
  providers: [TablesDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TablesKitchenSinkComponent implements OnInit {

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
      header: 'Cliente Id',
      field: 'cliente_Id',
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
      minWidth: 120,
    },
    {
      header: 'Fecha fin',
      field: 'fecha_Fin',
      minWidth: 120,
    },
    {
      header: 'Duracion',
      field: 'duracion',
      minWidth: 180,
      width: '200px',
    },
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



  constructor(
    private translate: TranslateService,
    private dataSrv: TablesDataService,
    public dialog: MtxDialog,
    private cdr: ChangeDetectorRef,
    public http: HttpClient) {
  }

  getdata() {
    this.http.get<proyecto[]>('https://localhost:44496/proyect').subscribe(result => {
      this.getdatatable(result);
    }, error => console.error(error));
  }

  getdatatable(data: proyecto[]) {
    this.proyectos = data;
    this.list = this.proyectos;
    this.isLoading = false;
  }

  ngOnInit() {
    this.getdata();
    console.log(this.list);
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
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

  updateCell() {
    //this.list = this.list.map(item => {
    //  /*item.weight = Math.round(Math.random() * 1000) / 100;*/
    //  return item;
    //});
  }

  updateList() {
    //this.list = this.list.splice(-1).concat(this.list);
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
