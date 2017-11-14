import { Injectable } from '@angular/core';
import { DataStorageService } from './data-store.service';

@Injectable()
export class UserStoreService {
  isLoadingUser: any;

  constructor(private dataStoreSvc: DataStorageService) { }

  getToken(): string {
    return this.dataStoreSvc.getByKey('token') || null;
  }

  loadUser(): any {
    throw new Error("Method not implemented.");
  }
}
