import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  signup(body: any) {
    return this.http.post(`${environment.sumaAuthenUrl}/signup`, body);
  }

  signin(body: any) {
    return this.http.post(`${environment.sumaAuthenUrl}/signin`, body);
  }

  isUserLoggedIn(): boolean {
    const profile = localStorage.getItem('profile');
    if (profile === null) {
      return false;
    }

    const profileObj = JSON.parse(profile);
    if (profileObj && profileObj.role === 1) {
      return true;
    } else {
      return false;
    }

  }
}
