import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent, UserDetailsComponent, NotSelectedComponent, UsersComponent } from './components/';
import { UsersResolverService } from '../shared/module/providers/users-resolve.service';
import { UserRouteValidService } from '../shared/module/providers/';

export const USERS_ROUTES: Routes = [
  {
    path: 'users', children: [
      { path: '', component: UsersComponent, resolve: { users: UsersResolverService }, pathMatch: 'full' },
      {
        path: ':id/details',
        component: UserDetailsComponent,
        canActivate: [UserRouteValidService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(USERS_ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }