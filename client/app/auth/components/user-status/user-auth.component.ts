import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../../../shared/';
import { AuthService, ErrorService } from '../../../shared/module/services/';

@Component({
  selector: 'em-user-auth',
  templateUrl: 'user-auth.component.html'
})

export class UserAuthComponent implements OnInit, OnDestroy {
  currentUser: IUser = null;
  isLoggedIn = false;

  constructor(
    private authSvc: AuthService, 
    private errorSvc: ErrorService,
    private router: Router) { }

  ngOnInit() {
    this.authSvc.isLoggedChange$.subscribe(val => {
      if (val) {
        this.isLoggedIn = true;
        this.currentUser = this.authSvc.currentUser;
      } else {
        this.errorSvc.error('Authentication faild', 'User-Auth Cmp', '/auth/signin');
      }
    })
  }

  ngOnDestroy() {
    this.authSvc.isLoggedChange$.unsubscribe();
  }

  logIn() {
    this.router.navigateByUrl('/auth/signin');
  }

  logOut() {
    this.authSvc.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigateByUrl('/auth/signin');
  }
}