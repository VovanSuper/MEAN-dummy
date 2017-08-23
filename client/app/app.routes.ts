import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotfoundComponent } from './notfound/';
// import { MainComponent } from './main/';
import { EventsResolverService } from './shared/module/providers/';

export const ROUTES_DEFINITION: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(ROUTES_DEFINITION, {
  preloadingStrategy: PreloadAllModules
});
