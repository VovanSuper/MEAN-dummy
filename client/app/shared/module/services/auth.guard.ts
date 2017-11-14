import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authSvc.isAuthenticated())
      this.router.navigateByUrl('/authenticate');

    return this.authSvc.isAuthenticated();
  }
}