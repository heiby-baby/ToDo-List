import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/services/model/user.model";
import {TaskService} from "../../../shared/services/task.service";
import {Task} from "../../../shared/services/model/task.model";
import {dbTaskModel} from "../../../shared/services/model/dbTask.model";

@Component({
  selector: 'curs-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent{
  newTask: Task = { task: '', urgency: false };
  user: User = new User("","","");
  tasks: Task[] = [];
  DbTasks: dbTaskModel =  new dbTaskModel();

  constructor(private taskService : TaskService) {
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
    this.taskService.getTasksByUserId(this.user.id!).subscribe((ServerTasks: dbTaskModel[]) => {
      this.tasks = ServerTasks[0].WorkTask!;
      this.DbTasks.TodayTask = ServerTasks[0].TodayTask;
      this.DbTasks.HomeTask = ServerTasks[0].HomeTask;
      this.DbTasks.userId = ServerTasks[0].id!;
      this.DbTasks.id = ServerTasks[0].id!;
    })
  }

  addTask() {
    if (this.newTask.task.trim() !== '') {
      this.newTask.id = this.tasks.length + 1
      this.tasks.push({ ...this.newTask });
      this.DbTasks.WorkTask = this.tasks;
      console.log(this.DbTasks);
      this.taskService.updateTask(this.DbTasks)
        .subscribe(response => {
          console.log('Данные успешно отправлены на сервер');
        }, error => {
          console.error('Ошибка при отправке данных на сервер');
        });
      this.newTask = { task: '', urgency: false };
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    for (let i: number = index; i < this.tasks.length; i++) {
      this.tasks[i].id = i+1;
    }
    this.DbTasks.WorkTask = this.tasks;
    this.taskService.updateTask(this.DbTasks)
      .subscribe(response => {
        console.log('Данные успешно отправлены на сервер');
      }, error => {
        console.error('Ошибка при отправке данных на сервер');
      });
    this.newTask = {task: '', urgency: false};
  }
  editTask(index: number) {
    this.tasks.forEach((task, i) => {
      if (index === i) {
        task.editing = !task.editing;
        if (!task.editing) {
          this.updateTask();
        }
      } else {
        task.editing = false;
      }
    });
  }
  updateTask(){
    this.DbTasks.HomeTask = this.tasks;
    this.taskService.updateTask(this.DbTasks)
      .subscribe(response => {
        console.log('Данные успешно отправлены на сервер');
      }, error => {
        console.error('Ошибка при отправке данных на сервер');
      });
    this.newTask = {task: '', urgency: false};
  }

}

