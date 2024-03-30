import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.services";
import {User} from "../../shared/services/model/user.model";
import {Message} from "../../shared/services/model/message.model";
import {AuthService} from "../../shared/services/auth.service";
import {Params} from "@angular/router";
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'curs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

 message: Message = new Message("danger", '');
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService : AuthService,
    private usersService: UsersService,
    ) {
    this.form = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }



  ngOnInit () {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.ShowMessage({
          text: "Успешно",
          type: 'success'
        })
      } else if(params['deletedUser']){
        this.ShowMessage({
          text: "Аккаунт удалён",
          type: "success"
        })
      }
    })
  }

  onSubmit(){
    localStorage.clear();
    const formData= this.form.value;
    this.usersService.getUserByEmail(formData.email).subscribe(
      (user: User[]) => {
        console.log(user);
        if(user.length == 1){
          if(user[0].password === formData.password){
            this.authService.login();
            user[0].password = "";
            const userJSON = JSON.stringify(user[0]);
            localStorage.setItem("user", userJSON);
            this.router.navigate(["/system", "today"]);
          }
          else{
            this.ShowMessage({
              text: "Incorrect password", type: "danger"
            });
          }
        } else {
          this.ShowMessage({
            text: "Login not found", type: "danger"
          });
        }
      },
      (error) => {
        console.error('Ошибка при получении пользователя:', error);
        this.ShowMessage({
          text: "Please try again later.", type: "danger"
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
  JumpToSignUp() {
    this.router.navigate(['/registration']);
  }
}
