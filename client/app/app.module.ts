import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
//import { TabsModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header';

import { EventsComponent, EventComponent, EventDetailsComponent } from './events';
import { NotfoundComponent } from './notfound';
import { AppRoutingModule } from './';
import { ApiService,
  RouteValidService,
  ErrorService,
  ToastrService,
  toastrToken,
  canDeactivate,
  EventsResolverService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    EventsComponent,
    EventComponent,
    EventDetailsComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    RouteValidService,
    EventsResolverService,
    { provide: toastrToken, useValue: toastrToken },
    { provide: 'canLeave', useValue: canDeactivate },
    ToastrService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
