import {NgModule, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import { SystemComponent } from "./system.component";
import {SystemRoutingModule} from "./system-routing.module";

import { TodayComponent } from './pages/today/today.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkComponent } from './pages/work/work.component';

import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    TodayComponent,
    SystemComponent,
    HomeComponent,
    WorkComponent,
    SidebarComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    FormsModule,
    SharedModule,
  ]
})

export class SystemModule{
}
