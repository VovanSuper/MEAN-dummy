import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { EventsRoutingModule } from './events.routing.module';
import {
  EventsComponent,
  EventComponent,
  EventDetailsComponent,
  NotSelectedComponent,
  EventCreateComponent
} from './components/';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    MomentModule,
    EventsRoutingModule
  ],
  declarations: [
    EventsComponent,
    EventComponent,
    EventDetailsComponent,
    EventCreateComponent,
    NotSelectedComponent
  ]
})
export class EventsModule { }