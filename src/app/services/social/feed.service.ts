import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateFeedRequest } from 'src/app/models/feeds/create-feed-request.model';
import { Feed } from 'src/app/models/feeds/feed.model';
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

  post(model: CreateFeedRequest): Observable<object> {
    return this.http.post(`${environment.sumaSocialUrl}/feeds`, model);
  }
}
