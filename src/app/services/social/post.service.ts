import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getMany(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.sumaSocialUrl}/posts`);
  }

  post(formData: FormData): Observable<Post> {
    return this.http.post<Post>(`${environment.sumaSocialUrl}/posts`, formData);
  }
}
