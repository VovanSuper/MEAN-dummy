import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent, UserDetailsComponent, NotSelectedComponent, UsersComponent } from './components/';
import { UsersResolverService } from "../shared/module/providers/users-resolve.service";

export const USERS_ROUTES: Routes = [
  {
    path: 'users', component: UsersComponent, resolve: { users: UsersResolverService },
    children: [
      { path: '', component: NotSelectedComponent, pathMatch: 'full' },
      {
        path: ':id/details',
        component: UserDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(USERS_ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }