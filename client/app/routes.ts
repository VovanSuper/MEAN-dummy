import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotfoundComponent } from "./notfound/";
// import { MainComponent } from './main';


export const ROUTES_DEFINITION: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES_DEFINITION, {
  preloadingStrategy: PreloadAllModules
});
