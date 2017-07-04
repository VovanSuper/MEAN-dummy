import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
//import { TabsModule } from 'ng2-bootstrap';

import { AppComponent, AppRoutingModule } from './';
import { HeaderComponent } from "./header/";
import { NotfoundComponent } from "./notfound/";
import { EventsModule } from "./events/";
import { SharedServicesModule } from "./shared/module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    SharedServicesModule.forRoot(),
    EventsModule,
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
