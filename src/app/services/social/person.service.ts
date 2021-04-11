import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProfileImageResponse } from 'src/app/dtos/persons/UpdateProfileImageResponseDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  updateProfileImage(formData: FormData): Observable<UpdateProfileImageResponse> {
    return this.http.put<UpdateProfileImageResponse>(`${environment.sumaSocialUrl}/persons/profile-image`, formData);
  }

}
