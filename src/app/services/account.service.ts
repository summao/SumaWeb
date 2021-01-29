import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  signup(body: any) {
    return this.http.post(`${environment.sumaAuthenUrl}/signup`, body);
  }

  signin(body: any): Observable<Profile> {
    return this.http.post<Profile>(`${environment.sumaAuthenUrl}/signin`, body);
  }

  isUserLoggedIn(): boolean {
    const profile = localStorage.getItem('profile');
    if (profile === null) {
      return false;
    }

    const profileObj = <Profile>JSON.parse(profile);
    if (profileObj && profileObj.role === 1) {
      return !this.jwtHelper.isTokenExpired(profileObj.jwtToken);
    } else {
      return false;
    }

  }
}
