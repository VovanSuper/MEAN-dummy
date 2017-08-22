import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { UserComponent, UserDetailsComponent, UsersComponent, NotSelectedComponent } from './components/';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MomentModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UserDetailsComponent,
    UsersComponent,
    NotSelectedComponent
  ]
})
export class UsersModule { }