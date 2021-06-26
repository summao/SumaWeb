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
  // private profileSubject: BehaviorSubject<Profile>;
  // public profile: Observable<Profile>;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    // this.profileSubject = new BehaviorSubject<Profile>(null as any);
    // this.profile = this.profileSubject.asObservable();
  }

  // public get profileValue(): Profile {
  //   // return this.profileSubject.value;
  // }

  signup(body: any) {
    return this.http.post(`${environment.sumaAuthenUrl}/signup`, body);
  }

  signin(body: any): Observable<Profile> {
    return this.http.post<Profile>(`${environment.sumaAuthenUrl}/signin`, body)
      .pipe(
        map(profile => {
          this.saveToLocalStorage(profile);
          // this.profileSubject.next(profile);
          // this.startRefreshTokenTimer();
          return profile;
        })
      );
  }

  refreshToken(): Observable<RefreshTokenResponseDto> {
    const profile = this.getProfile();
    const body = new RefreshTokenRequestDto({
      userId: profile?.id,
      refreshToken: profile?.refreshToken,
    });
    return this.http.post<RefreshTokenResponseDto>(`${environment.sumaAuthenUrl}/refreshtoken`, body)
      .pipe(
        map(res => {
          const newProfile = this.getProfile();
          if (newProfile !== null) {
            newProfile.accessToken = res.accessToken;
            newProfile.refreshToken = res.refreshToken;
            this.saveToLocalStorage(newProfile);
            // this.profileSubject.next(newProfile);
          }

          return res;
        })
      );
  }

  isUserSignedIn(): boolean {
    if (this.getProfile() !== null) {
      return true;
    }

    return false;
  }

  saveToLocalStorage(profile: Profile): void {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getProfile(): Profile | null {
    const profile = localStorage.getItem('profile');
    if (!profile) {
      return null;
    }

    return <Profile>JSON.parse(profile);
  }

  // isTokenOneMinuteBeforeExpired(accessToken :string): boolean {
  //   const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
  //   const expires = new Date(jwtToken.exp * 1000);
  //   const expireOneMinuteBefore =  expires.getTime() - (60 * 1000);
  //   const currentDate = Date.now();
  //   console.log(new Date(expireOneMinuteBefore));
  //   console.log(new Date(expires));
  //   console.log(new Date(currentDate));
  //   if (expireOneMinuteBefore < currentDate) {
  //     console.log('isTokenOneMinuteBeforeExpired: true'); 
  //     return true;
  //   }
  //   console.log('isTokenOneMinuteBeforeExpired: false'); 
  //   return false;
  // }

  // async restoreProfile(): Promise<void> {
  //   if (this.isUserSignedIn()) {
  //     return;
  //   }
  //   const profile = this.getFromLocalStorage();
  //   if (profile != null) {
  //     if (this.isTokenOneMinuteBeforeExpired(profile.accessToken)) {
  //       let res: any;
  //       try {
  //         res = await this.refreshToken({ userId: profile.id, refreshToken: profile.refreshToken }).toPromise();
  //       } catch (error) {
  //         console.log(error);
  //         return;
  //       }
  //     } else {
  //       this.profileSubject.next(profile);
  //       this.startRefreshTokenTimer();
  //     }
  //   }
  // }

  // helper methods

  // private refreshTokenTimeout: any;

  // private startRefreshTokenTimer() {
  //   // parse json object from base64 encoded jwt token
  //   const jwtToken = JSON.parse(atob(this.profileValue.accessToken.split('.')[1]));

  //   // set a timeout to refresh the token a minute before it expires
  //   const expires = new Date(jwtToken.exp * 1000);
  //   const timeout = expires.getTime() - Date.now() - (60 * 1000);
  //   console.log('startRefreshTokenTimer');
  //   this.refreshTokenTimeout = setTimeout(() => this.refreshToken({
  //     userId: this.profileValue.id,
  //     refreshToken: this.profileValue.refreshToken
  //   })
  //     .subscribe(), timeout);
  // }

  // private stopRefreshTokenTimer() {
  //   clearTimeout(this.refreshTokenTimeout);
  // }
}
