import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Music } from '../interfaces/music.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicTempService {

  constructor(private http:HttpClient) { }

  AddMusicTemp(Music: Music): Observable<Music>{
    return this.http.post<Music>(`http://localhost:5000/musicTemp/create`, Music);
  }
  getAllMusicTemp(){
    return this.http.get(`http://localhost:5000/musicTemp`)
  }
}
