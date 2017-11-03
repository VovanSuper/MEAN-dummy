import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailsComponent, EventsComponent, NotSelectedComponent } from './components/';
import { EventRouteValidService, EventsResolverService } from '../shared/module/providers/';

export const EVENTS_ROUTES: Routes = [
  {
    path: 'events', children: [
      { path: '', component: EventsComponent, resolve: { events: EventsResolverService }, pathMatch: 'full' },
      {
        path: ':id/details',
        component: EventDetailsComponent,
        canActivate: [EventRouteValidService],
        canDeactivate: ['canLeave']
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(EVENTS_ROUTES)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }