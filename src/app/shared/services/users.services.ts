import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user.model";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url : string = 'http://localhost:3000/Users'
  baseUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient) { }
  getUserByEmail(email: string) {
    return this.http.get<User[]>(`${this.url}?email=${email}`).pipe(
      catchError((error) => {
        return throwError('Сервер недоступен. Попробуйте позже.');
      })
    );
  }
  createNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete<any>(url);
  }
}
