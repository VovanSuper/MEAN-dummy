import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main';
import { ConferencesComponent, conferences_routes } from './conferences';
import { WorkshopsComponent } from './workshops';
import { NotfoundComponent } from './notfound';

export const ROUTES_DEFINITION: Routes = [
  { path: 'conferences', component: ConferencesComponent, children: [...conferences_routes] },
  { path: 'workshops', component: WorkshopsComponent },
  { path: '', redirectTo: 'conferences', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent, pathMatch: 'full' }
]

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES_DEFINITION)