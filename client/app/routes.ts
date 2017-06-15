import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main';
import { NotfoundComponent } from './notfound';
import { EventsComponent, EventComponent, EventDetailsComponent } from './events';

export const ROUTES_DEFINITION: Routes = [
  { path: 'events/:id/details', component: EventDetailsComponent },
  { path: 'events', component: EventsComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES_DEFINITION);
