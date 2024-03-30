import { Component } from '@angular/core';
import {Router, Routes} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/services/model/user.model";
import {UsersService} from "../../shared/services/users.services";
import {AbstractControl} from "@angular/forms";
import {TaskService} from "../../shared/services/task.service";
import {Message} from "../../shared/services/model/message.model";

@Component({
  selector: 'curs-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent {
  form : FormGroup
  message: Message = new Message("danger", '');
  constructor(
    private router: Router,
    private usersService: UsersService,
    private taskService: TaskService,
  )
  {
    this.form = new FormGroup({
      "name": new FormControl(null, [Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
      "agree": new FormControl(false, [Validators.requiredTrue]),
    });

  }
  forbiddenEmails(control: AbstractControl): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      this.usersService.getUserByEmail(control.value).subscribe(
        (user: User[])  => {
          if(user.length === 1){
            resolve({forbiddenEmail: true});
          } else{
            resolve(null);
          }
        },
        (error) => {
          console.error('Ошибка при получении пользователя:', error);
          this.ShowMessage({
            text: "Please try again later.", type: "danger"
          });
        }
      )
    })
  }

  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.usersService.createNewUser(user).subscribe
    (
      (user: User) => {
        this.taskService.createNewTasks(user).subscribe(()=>{
          this.router.navigate(['/login'], {queryParams: {nowCanLogin: true}});
        });
      }
    );
  }


  ShowMessage(message: Message) : Message{
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
    console.log(this.message);
    return this.message;
  }
  JumpToLogIn(): void{
    this.router.navigate(["/login"])
  }

}
