import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { RefreshTokenRequestDto } from 'src/app/dtos/accounts/refreshTokenRequestDto';
import { environment } from 'src/environments/environment';
import { Profile } from '../../models/profile.model';
import { map } from 'rxjs/operators';
import { RefreshTokenResponseDto } from 'src/app/dtos/accounts/refreshTokenResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private profileSubject: BehaviorSubject<Profile>;
  public profile: Observable<Profile>;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { 
    this.profileSubject = new BehaviorSubject<Profile>(null as any);
    this.profile = this.profileSubject.asObservable();
  }

  public get profileValue(): Profile {
    return this.profileSubject.value;
  }

  signup(body: any) {
    return this.http.post(`${environment.sumaAuthenUrl}/signup`, body);
  }

  signin(body: any): Observable<Profile> {
    return this.http.post<Profile>(`${environment.sumaAuthenUrl}/signin`, body)
      .pipe(
        map(profile => {
          this.profileSubject.next(profile);
          this.startRefreshTokenTimer();
          return profile;
        })
      );
  }

  refreshToken(body: RefreshTokenRequestDto): Observable<RefreshTokenResponseDto> {
    return this.http.post<RefreshTokenResponseDto>(`${environment.sumaAuthenUrl}/refreshtoken`, body)
    .pipe(
      map(res => {
        const newProfile = this.profileValue;
        newProfile.accessToken = res.accessToken;
        newProfile.refreshToken = res.refreshToken;
        this.profileSubject.next(newProfile);
        this.startRefreshTokenTimer();
        return res;
      })
    );
  }

  isUserSignedIn(): boolean {
    const profile = localStorage.getItem('profile');
    if (profile === null) {
      return false;
    }

    const profileObj = <Profile>JSON.parse(profile);
    if (profileObj && profileObj.role === 1) {
      return !this.jwtHelper.isTokenExpired(profileObj.accessToken);
    } else {
      return false;
    }

  }

  saveToLocalStorage(profile: Profile): void {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getFromLocalStorage(): Profile | null {
    const profile = localStorage.getItem('profile');
    if (!profile) {
      return null;
    }

    return <Profile>JSON.parse(profile);
  }

  restoreProfile(): void {
    const profile = this.getFromLocalStorage();
    if (profile != null) {
      this.profileSubject.next(profile);
    }
  }

  // helper methods

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.profileValue.accessToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken({
      userId: this.profileValue.id,
      refreshToken: this.profileValue.refreshToken
    })
      .subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
