import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UnsignedInGuardService implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private jwtHelper: JwtHelperService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // await this.accountService.restoreProfile();

    if (this.accountService.isUserSignedIn()) {
      // signed in user try to browse signup or signin will redirect to post
      if (state.url === '') {
        this.router.navigate(['news-feed']);
        return false;
      }

      return true;
    } else {
      // these paths are public
      if (state.url === '') {
        return true;
      }

      // unsigned in user will redirect to signin
      this.router.navigate(['']);
      return false;
    }

  }
}
