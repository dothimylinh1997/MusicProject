import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Music } from '../interfaces/music.interface';
@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  constructor(private http:HttpClient) { }
  getMusics(){
   return this.http.get('http://localhost:5000/music');
  }
  getMusicsById(id:string){
    return this.http.get(`http://localhost:5000/music/${id}`);
  }
  getMusicsByType(id:string){
    return this.http.get(`http://localhost:5000/music/type/${id}`);
  }
  getMusicBySinger(id: string){
    return this.http.get(`http://localhost:5000/music/singer/${id}`);
  }
  getMusicByList(id: string){
    return this.http.get(`http://localhost:5000/music/list/${id}`);
  }
  DeleteMusicbyID(id: string){
    return this.http.delete(`http://localhost:5000/music/delete/${id}`)
  }
  AddLyrics(id: string, music: Music){
    return this.http.put(`http://localhost:5000/music/update/${id}`, music);
  }
  AddMusic(music: Music){
    return this.http.post(`http://localhost:5000/music/create`, music);
  }
}
