import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
//import { TabsModule } from 'ng2-bootstrap';

import {
  AppComponent,
  AppRoutingModule
} from './';
import { HeaderComponent } from "./header/";
import { NotfoundComponent } from "./notfound/";
import { EventsModule } from "./events/";
import { toastrToken, ToastrService, ErrorService } from "./shared/";

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
    EventsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: toastrToken, useValue: toastrToken },
    ToastrService,
    ErrorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
