import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Singer } from '../interfaces/singer.interface';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) { }
  getAllSinger() {
    return this.http.get<Singer[]>('http://localhost:5000/singer');
  }
  getSingerbyID(id: string) {
    return this.http.get(`http://localhost:5000/singer/${id}`);
  }
  getSingerbyMusic(id: string){
    return this.http.get(`http://localhost:5000/singer/music/${id}`);
  }
  AddSinger(singer: Singer){
    return this.http.post(`http://localhost:5000/singer/create`, singer);
  }
  DeleteSingerbyID(id: String){
    return this.http.delete(`http://localhost:5000/singer/delete/${id}`);
  }
}
