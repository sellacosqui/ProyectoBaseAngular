import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableRoutingModule } from './Proyectos-routing.module';

import { ProyectosListComponent } from './List/ProyectosList.component';
import { ProyectoDatosComponent } from './Datos/ProyectoDatos.component';
import {
  ProyectoComponent,
  DialogInteresadosFormComponent,
  DialogEDTFormComponent,
  DialogRequsitosFormComponent,
  DialogActividadesFormComponent,
  DialogRecursos_ProyectosFormComponent,
  DialogRecursosCrearFormComponent,
  DialogActividadesCrearFormComponent,
  DialogComunicacionCrearFormComponent,
  DialogRiesgoCrearFormComponent,
  DialogRequisitosAsignarFormComponent,
  DialogEDTAsignarFormComponent,
  DialogActividadesIntervalosFormComponent,
  DialogComunicacionMasivoFormComponent,
  DialogInteresadosMasivoFormComponent,
  DialogRequsitosMasivoFormComponent,
  DialogRiegosMasivoFormComponent
} from './Proyecto/Proyecto.component';
//import { TablesRemoteDataComponent } from './remote-data/remote-data.component';

const COMPONENTS: any[] = [ProyectosListComponent, ProyectoDatosComponent, ProyectoComponent, ];
const COMPONENTS_DYNAMIC: any[] = [DialogInteresadosFormComponent, DialogEDTFormComponent, DialogRequsitosFormComponent, DialogActividadesFormComponent, DialogRecursos_ProyectosFormComponent, DialogRecursosCrearFormComponent, DialogActividadesCrearFormComponent, DialogComunicacionCrearFormComponent, DialogRiesgoCrearFormComponent, DialogRequisitosAsignarFormComponent, DialogEDTAsignarFormComponent, DialogActividadesIntervalosFormComponent, DialogComunicacionMasivoFormComponent
  , DialogInteresadosMasivoFormComponent, DialogRequsitosMasivoFormComponent, DialogRiegosMasivoFormComponent];

@NgModule({
  imports: [SharedModule, TableRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class proyectosModule { }
