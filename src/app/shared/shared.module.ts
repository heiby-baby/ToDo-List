import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
  exports: [ReactiveFormsModule, FormsModule,],
  providers: [AuthService],
})
export class SharedModule{}
