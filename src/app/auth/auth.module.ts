import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './login/login.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationsComponent,
  ],
  imports:[
    SharedModule,
    CommonModule,
    AuthRoutingModule
  ]
})

export class AuthModule{}
