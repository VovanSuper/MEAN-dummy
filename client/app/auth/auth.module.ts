import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { SigninComponent, SignupComponent } from './components/';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }