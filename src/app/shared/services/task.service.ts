import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Task} from "./model/task.model";
import {User} from "./model/user.model";
import {AuthService} from "./auth.service";
import {dbTaskModel} from "./model/dbTask.model";
@Injectable({
  providedIn: 'root'
})
export class TaskService {



  constructor(private http: HttpClient, private authService: AuthService) {
  }

  base_url: string = 'http://localhost:3000';
  createNewTasks(user: User): Observable<Task[]> {
    let today: string = "TodayTask";
    let work: string = "WorkTask";
    let home: string = "HomeTask";

      const requestData: { [key: string]: any } = {};
    requestData[today] = [];
    requestData[work] = [];
    requestData[home] = [];
    console.log(requestData);
    return this.http.post<[Task]>(`${this .base_url}/Users/${user.id}/Tasks`, requestData);
  }

  getTasksByUserId(id: number): Observable<dbTaskModel[]> {
    return this.http.get<dbTaskModel[]>(`${this.base_url}/Tasks?id=${id}`);
  }

  updateTask(tasks: dbTaskModel): Observable<any>{
      return this.http.put<dbTaskModel[]>(`${this.base_url}/Tasks/${tasks.id}`, tasks);
  }
}
