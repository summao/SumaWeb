import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountService } from '../services/authen/account.service';
import { environment } from 'src/environments/environment';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { RefreshTokenResponseDto } from '../dtos/accounts/refreshTokenResponseDto';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string>(null as any);

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.accountService.getProfile()?.accessToken;
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log('error1')
        return this.handle401Error(request, next);
      } else {
        throw error;
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    const isApiUrl = request.url.startsWith(environment.sumaSocialUrl);
    if (isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null as any);

      return this.accountService.refreshToken().pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log('navigate');
            this.router.navigate(['/']);
          } 
            throw error;
        }),
        switchMap((res: RefreshTokenResponseDto) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(res.accessToken);
          return next.handle(this.addToken(request, res.accessToken));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
