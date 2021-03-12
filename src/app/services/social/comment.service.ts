import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentResponse } from 'src/app/models/comments/create-comment-response.model';
import { Comment } from 'src/app/models/comments/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  getMany(feedId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.sumaSocialUrl}/comments/feed/${feedId}`);
  }

  comment(model: any): Observable<CreateCommentResponse> {
    return this.http.post<CreateCommentResponse>(`${environment.sumaSocialUrl}/comments`, model);
  }
}
