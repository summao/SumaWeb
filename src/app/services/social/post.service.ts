import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostRequest } from 'src/app/models/posts/create-post-request.model';
import { Post } from 'src/app/models/posts/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.sumaSocialUrl}/posts`);
  }

  post(model: CreatePostRequest): Observable<object> {
    return this.http.post(`${environment.sumaSocialUrl}/posts`, model);
  }
}
