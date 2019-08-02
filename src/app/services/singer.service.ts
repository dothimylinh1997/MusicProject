import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) { }
  getAllSinger() {
    return this.http.get('http://localhost:5000/singer');
  }
  getSingerbyID(id: string) {
    return this.http.get(`http://localhost:5000/singer/${id}`);
  }
}
