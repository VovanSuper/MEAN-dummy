import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main';
import { NotfoundComponent } from './notfound';
import { EventsComponent, EventComponent, EventDetailsComponent } from './events';
import { RouteValidService, EventsResolverService } from './shared';

export const ROUTES_DEFINITION: Routes = [
  {
    path: 'events', children: [
      {
        path: ':_id/details', component: EventDetailsComponent,
        canActivate: [RouteValidService], canDeactivate: ['canLeave']
      },
      { path: '', component: EventsComponent, resolve: { 'events' : EventsResolverService } }
    ]
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES_DEFINITION);
