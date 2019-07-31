import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
