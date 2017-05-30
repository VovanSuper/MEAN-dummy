import { Routes } from '@angular/router';
import { ConferencesComponent, ConferenceComponent } from './';

export const conferences_routes: Routes = [
  { path: ':id', component: ConferenceComponent, outlet: 'conf' },
  { path: '', component: ConferenceComponent, pathMatch: 'full', outlet: 'conf' }
]