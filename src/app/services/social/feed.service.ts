import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from 'src/app/models/feed.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${environment.sumaSocialUrl}/feeds`);
  }
}
