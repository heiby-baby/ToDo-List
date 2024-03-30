import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { SystemModule } from "./system/system.module";
import { Error404Component } from './error404/error404.component';

import {UsersService} from "./shared/services/users.services";
import { Error403Component } from './system/error403/error403.component';
import {TaskService} from "./shared/services/task.service";
import {AuthService} from "./shared/services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    Error403Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    SystemModule,
    AppRoutingModule,
  ],
  providers: [UsersService, TaskService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
