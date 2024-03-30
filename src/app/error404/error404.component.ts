import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'curs-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component {

  constructor(private router: Router) {
  }
  GoToLogin(){
    this.router.navigate(["login"]);
  }
}
