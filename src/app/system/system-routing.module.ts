import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { TodayComponent } from './pages/today/today.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkComponent } from './pages/work/work.component';
import {appGuardGuard} from "../app-guard.guard";
import {Error403Component} from "./error403/error403.component";

const systemRoutes: Routes = [
  {
    path: 'system', component: SystemComponent, canActivate: [appGuardGuard],
    children: [
      { path: 'today', component: TodayComponent},
      { path: 'home', component: HomeComponent },
      { path: 'work', component: WorkComponent},
    ],
  },
  { path: "error403", component: Error403Component },
];

@NgModule({
  imports: [RouterModule.forChild(systemRoutes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
