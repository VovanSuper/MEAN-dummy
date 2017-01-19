import { Routes } from '@angular/router';
import { ConferenceComponent } from './';

export const conferences_routes: Routes = [
  { path: ':name', component: ConferenceComponent }
]