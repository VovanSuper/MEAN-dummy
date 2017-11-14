import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import {
  ApiService,
  canDeactivate,
  ErrorService,
  EventsResolverService,
  EventRouteValidService,
  UserRouteValidService,
  Toastr,
  TOASTR_TOKEN,
  UsersResolverService,
  AuthGuard,
  AuthService,
  DataStorageService,
  HttpHelpersService,
  UserStoreService
} from './services/';

declare const toastr: Toastr;

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpModule,
    MomentModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpModule,
    MomentModule
  ]
})
export class SharedServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServicesModule,
      providers: [
        { provide: 'canLeave', useValue: canDeactivate },
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: ErrorService, useClass: ErrorService },
        { provide: EventRouteValidService, useClass: EventRouteValidService },
        { provide: UserRouteValidService, useClass: UserRouteValidService },
        { provide: EventsResolverService, useClass: EventsResolverService },
        { provide: UsersResolverService, useClass: UsersResolverService },
        { provide: DataStorageService, useClass: DataStorageService },
        { provide: UserStoreService, useClass: UserStoreService },
        { provide: HttpHelpersService, useClass: HttpHelpersService },
        { provide: ApiService, useClass: ApiService },
        { provide: AuthService, useClass: AuthService },
        { provide: AuthGuard, useClass: AuthGuard }
      ]
    };
  }
}
