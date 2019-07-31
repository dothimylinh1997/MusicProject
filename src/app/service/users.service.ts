import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  onSignup(user: User): Observable<User> {
    console.log(user);
    
    return this.http.post<User>(`${this.Port}:5000/user/create`, user);
  }
}
