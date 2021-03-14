import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UnsignedInGuardService implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.accountService.isUserLoggedIn()) {
      // signed in user try to browse signup or signin will redirect to post
      if (state.url === '/signup' || state.url === '/signin') {
        this.router.navigate(['post']);
        return false;
      }

      return true;
    } else {
      // these paths are public
      if (state.url === '/signup' || state.url === '/signin') {
        return true;
      }

      // unsigned in user will redirect to signin
      this.router.navigate(['signin']);
      return false;
    }

  }
}
