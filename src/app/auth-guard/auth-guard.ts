import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      route.routeConfig?.path === 'signin' ||
      route.routeConfig?.path === 'signup'
    ) {
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl('/item');
        return false;
      }
      return true;
    } else {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigateByUrl('/auth');
        return false;
      }
    }
  }
}
