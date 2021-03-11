import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentResponse } from 'src/app/models/comments/CreateCommentResponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  comment(model: any): Observable<CreateCommentResponse> {
    return this.http.post<CreateCommentResponse>(`${environment.sumaSocialUrl}/comments`, model);
  }
}
