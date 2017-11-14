import { Injectable } from '@angular/core';
import { UserStoreService } from './user-store.service';

@Injectable()
export class AuthService {
  token = null;

  constructor(private userStoreSvc: UserStoreService) { }

  isAuthenticated(): boolean {
    let token = this.userStoreSvc.getToken();
    let isAuth = (token !== null);
    if (isAuth)
      this.token = token;     //when auth by loading local token from storage not by login form

    return isAuth;
  }
}