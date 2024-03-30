import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./login/login.component";
import {RegistrationsComponent} from "./registrations/registrations.component";

const routes: Routes = [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationsComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }


