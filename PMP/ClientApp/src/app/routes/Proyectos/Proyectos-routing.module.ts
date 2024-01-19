import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectosListComponent } from './List/ProyectosList.component';
import { ProyectoComponent } from './Proyecto/Proyecto.component';
import { ProyectoDatosComponent } from './Datos/ProyectoDatos.component';

const routes: Routes = [
  { path: 'list', component: ProyectosListComponent },
  { path: 'datos', component: ProyectoDatosComponent },
  { path: 'datos/:id', component: ProyectoDatosComponent },
  //{ path: 'Proyectos/:id/Interesados-tab', component: InteresadosComponent, children: TABS_DEMO_ROUTES },
  { path: 'Proyectos/:id', component: ProyectoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule { }
