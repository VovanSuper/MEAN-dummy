import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
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
  IToastr,
  UsersResolverService,
  AuthGuard,
  AuthService,
  DataStorageService,
  HttpHelpersService,
  UserStoreService,
  TOASTR_TOKEN,
  JQUERY_TOKEN
} from './services/';

declare const toastr: IToastr;
declare const $: any;

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
  constructor( @Optional() @SkipSelf() self: SharedServicesModule) {
    if (self) throw new Error('Should only be imported in App.module')
  }


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServicesModule,
      providers: [
        { provide: 'canLeave', useValue: canDeactivate },
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQUERY_TOKEN, useValue: $ },
        { provide: ErrorService, useClass: ErrorService },
        { provide: HttpHelpersService, useClass: HttpHelpersService },
        { provide: ApiService, useClass: ApiService },
        { provide: EventRouteValidService, useClass: EventRouteValidService },
        { provide: UserRouteValidService, useClass: UserRouteValidService },
        { provide: EventsResolverService, useClass: EventsResolverService },
        { provide: UsersResolverService, useClass: UsersResolverService },
        { provide: DataStorageService, useClass: DataStorageService },
        { provide: UserStoreService, useClass: UserStoreService },
        { provide: AuthService, useClass: AuthService },
        { provide: AuthGuard, useClass: AuthGuard }
      ]
    };
  }
}
