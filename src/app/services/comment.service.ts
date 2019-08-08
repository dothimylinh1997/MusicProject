import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../interfaces/comment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
    
   }
   getCommnetbyMusic(id:string){
    return this.http.get(`http://localhost:5000/comment/music/${id}`);
  }
  getCommentbyUser(id: string){
    return this.http.get(`http://localhost:5000/comment/user/${id}`);
  }

  AddComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(`http://localhost:5000/comment/create`, comment);
  }

}
