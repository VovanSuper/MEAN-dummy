import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailsComponent, EventsComponent, NotSelectedComponent } from './components/';
import { RouteValidService, EventsResolverService } from '../shared/module/providers/';

export const EVENTS_ROUTES: Routes = [
  { path: '', component: EventsComponent, pathMatch: 'full' },
  {
    path: ':id/details',
    component: EventDetailsComponent,
    canActivate: [RouteValidService],
    canDeactivate: ['canLeave']
  }
];

@NgModule({
  imports: [RouterModule.forChild(EVENTS_ROUTES)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }