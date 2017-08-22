import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  ApiService,
  canDeactivate,
  ErrorService,
  EventsResolverService,
  RouteValidService,
  Toastr,
  TOASTR_TOKEN
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
        { provide: RouteValidService, useClass: RouteValidService },
        { provide: EventsResolverService, useClass: EventsResolverService },
        ErrorService
      ]
    };
  }
}
