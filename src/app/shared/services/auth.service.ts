import {User} from "./model/user.model";
import {dbTaskModel} from "./model/dbTask.model";

export class AuthService{
  private isAuthenticated = false;
  constructor() {}

  login() : void{
    this.isAuthenticated = true;
  }
  logout() : void {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn() : boolean {
    return this.isAuthenticated;
  }

}
