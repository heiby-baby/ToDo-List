import {Component, OnInit} from '@angular/core';
import {User} from "../../../../shared/services/model/user.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {Params, Router} from "@angular/router";
import {UsersService} from "../../../../shared/services/users.services";
import {applyMixins} from "rxjs/internal/util/applyMixins";


@Component({
  selector: 'curs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  isOpen = false;
  user: User = new User("", "", "");
  constructor(
    public authService: AuthService, private router: Router, private userService: UsersService
  )
  {}
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  DeleteUser(){
    this.userService.deleteUser(this.user.id!).subscribe(
      () => {
        console.log(`User with ID ${this.user.id} deleted`);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
    this.authService.logout();
    this.router.navigate(["login"], {queryParams: {deletedUser: true}});
  }

}
