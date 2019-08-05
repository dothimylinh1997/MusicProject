import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http:HttpClient) { }
  getAllType(){
    return this.http.get('http://localhost:5000/type');
  }
  getTypeByID(id: string){
    return this.http.get(`http://localhost:5000/type/${id}`)
  }
  getMusicsByType(id:string){
    return this.http.get(`http://localhost:5000/music/type/${id}`);
  }
}
