import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  ApiService,
  canDeactivate,
  ErrorService,
  EventsResolverService,
  EventRouteValidService,
  UserRouteValidService,
  Toastr,
  TOASTR_TOKEN,
  UsersResolverService
} from './providers/';

declare const toastr: Toastr;

@NgModule({})
export class SharedServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServicesModule,
      providers: [
        { provide: 'canLeave', useValue: canDeactivate },
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: ApiService, useClass: ApiService },
        { provide: EventRouteValidService, useClass: EventRouteValidService },
        { provide: UserRouteValidService, useClass: UserRouteValidService },
        { provide: EventsResolverService, useClass: EventsResolverService },
        { provide: UsersResolverService, useClass: UsersResolverService },
        ErrorService
      ]
    };
  }
}
