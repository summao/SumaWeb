import { Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { UnsignedInGuardService } from './unsigned-in-guard.service';

describe('UnsignedInGuardService', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let service: UnsignedInGuardService;

  beforeEach(() => {
    accountServiceSpy = <jasmine.SpyObj<AccountService>>jasmine.createSpyObj('AccountService', ['isUserLoggedIn']);
    routerSpy = <jasmine.SpyObj<Router>>jasmine.createSpyObj('Router', ['navigate']);
    service = new UnsignedInGuardService(routerSpy, accountServiceSpy);
  });

  describe('canActivate', () => {
    it('should return false and navigate to post when user is already signed in and url is /signin', () => {
      accountServiceSpy.isUserLoggedIn.and.returnValue(true);
      const result = service.canActivate(null as any, <RouterStateSnapshot>{ url: '/signin' });

      expect(result).toBeFalsy();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['post']);
    });

    it('should return false and navigate to post when user is already signed in and url is /signup', () => {
      accountServiceSpy.isUserLoggedIn.and.returnValue(true);
      const result = service.canActivate(null as any, <RouterStateSnapshot>{ url: '/signup' });

      expect(result).toBeFalsy();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['post']);
    });

    it('should return true and not navigate to any path when user is already signed in and url is not /signin or /signup', () => {
      accountServiceSpy.isUserLoggedIn.and.returnValue(true);
      const result = service.canActivate(null as any, <RouterStateSnapshot>{ url: '/post' });

      expect(result).toBeTruthy();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should return true and not navigate to any path when user is not signed in and url is /signup', () => {
      accountServiceSpy.isUserLoggedIn.and.returnValue(false);
      const result = service.canActivate(null as any, <RouterStateSnapshot>{ url: '/signup' });

      expect(result).toBeTruthy();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should return true and not navigate to any path when user is not signed in and url is /signin', () => {
      accountServiceSpy.isUserLoggedIn.and.returnValue(false);
      const result = service.canActivate(null as any, <RouterStateSnapshot>{ url: '/signin' });

      expect(result).toBeTruthy();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should return false and not navigate to signin when user is not signed in and url is not /signin or /signup', () => {
      accountServiceSpy.isUserLoggedIn.and.returnValue(false);
      const result = service.canActivate(null as any, <RouterStateSnapshot>{ url: '/post' });

      expect(result).toBeFalsy();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['signin']);
    });
  });
});
