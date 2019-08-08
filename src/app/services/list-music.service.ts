import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../interfaces/list.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListMusicService {

  constructor(private http: HttpClient) { }

  getListByUser(id: string): Observable<List> {
    return this.http.get<any>(`http://localhost:5000/list/user/${id}`);
  }
  CreateList(List: List): Observable <List>{
    return this.http.post<List>(`http://localhost:5000/list/create`, List);
  }
}
