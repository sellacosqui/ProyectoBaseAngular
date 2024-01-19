import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecursosComponent, DialogRecursosFormComponent } from './Recursos/Recursos.component';
import { RiesgosComponent, DialogRiesgosFormComponent } from './Riesgos/Riesgos.component';
import { UsuariosComponent, DialogUsuariosFormComponent } from './Usuarios/Usuarios.component';
import { RolesComponent, DialogRolesFormComponent } from './Roles/Roles.component';
import { ListaDespegableComponent, DialogListaDespegablFormComponent } from './ListaDespegable/ListaDespegable.component';
import { ActividadesComponent, DialogActividadesFormComponent } from './Actividades/Actividades.component';
import { ClientesComponent, DialogClientesFormComponent } from './Clientes/Clientes.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { Error403Component } from './sessions/403.component';
import { Error404Component } from './sessions/404.component';
import { Error500Component } from './sessions/500.component';
import { RecaptchaModule } from 'ng-recaptcha';

const COMPONENTS: any[] = [
  DashboardComponent,
  LoginComponent,
  RecursosComponent,
  ListaDespegableComponent,
  DialogListaDespegablFormComponent,
  RegisterComponent,
  Error403Component,
  ClientesComponent,
  RolesComponent,
  ActividadesComponent,
  RiesgosComponent,
  UsuariosComponent,
  Error404Component,
  Error500Component,
];
const COMPONENTS_DYNAMIC: any[] = [DialogRecursosFormComponent, DialogUsuariosFormComponent, DialogRolesFormComponent, DialogActividadesFormComponent, DialogListaDespegablFormComponent, DialogClientesFormComponent, DialogRiesgosFormComponent];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule, RecaptchaModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class RoutesModule {}
