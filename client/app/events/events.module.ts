import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { EventsComponent, EventComponent, EventDetailsComponent, NotSelectedComponent } from './components/';
import { EventsRoutingModule } from './events.routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    MomentModule,
    EventsRoutingModule
  ],
  declarations: [
    EventsComponent,
    EventComponent,
    EventDetailsComponent,
    NotSelectedComponent
  ]
})
export class EventsModule { }