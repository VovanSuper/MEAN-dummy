import { Injectable, Inject } from '@angular/core';
import { UserStoreService } from './user-store.service';
import { TOASTR_TOKEN, Toastr } from './';

@Injectable()
export class AuthService {
  token = null;

  constructor(private userStoreSvc: UserStoreService, @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

  isAuthenticated(): boolean {
    let token = this.userStoreSvc.getToken();
    let isAuth = (token !== null);
    if (isAuth) {
      this.token = token;     //when auth by loading local token from storage not by login form
      this.toastr.success(`Hello, USER`, 'Successful auth');
    } else {
      this.toastr.error(`Not authencticated`, 'Failed auth');
    }

    return isAuth;
  }
}