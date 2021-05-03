import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/authen/account.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.sumaSocialUrl);
    if (isApiUrl && this.accountService.isUserSignedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accountService.getFromLocalStorage()?.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
