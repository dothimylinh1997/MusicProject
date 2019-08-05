import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  Port = 'http://localhost';

  onLogin(user: User): Observable<User> {
    console.log(user);

    return this.http.post<any>(`${this.Port}:5000/user/sign`, user);
  }
  getUsers(): Observable<any> {
    console.log(123);
    return this.http.get<any>('http://localhost:5000/user/get/profile').pipe(
      map(data => {
        return data;
      })
    );
  }
  onSignup(user: User): Observable<User> {
    console.log(user);

    return this.http.post<User>(`${this.Port}:5000/user/create`, user);
  }
  onUpdate(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.Port}:5000/user/update/${id}`, user)
  }
  getUserbyID(id: string): Observable<User> {
    return this.http.get<User>(`${this.Port}:5000/user/get/${id}`)
  }
}
