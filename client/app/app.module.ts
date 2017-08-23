import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
// import { TabsModule } from 'ng2-bootstrap';

import { AppRoutes } from './app.routes';
import { SharedServicesModule } from './shared/module/';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './header/';
import { NotfoundComponent } from './notfound/';
import { EventsModule } from './events/';
// import { UsersModule } from "./users/";
// import { TabsComponent } from "./tabs/";
// import { MainComponent } from "./main/";

@NgModule({
  declarations: [
    HeaderComponent,
    NotfoundComponent,
    // TabsComponent,
    // MainComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    SharedServicesModule.forRoot(),
    // TabsModule.forRoot(),
    EventsModule,
    // UsersModule,
    AppRoutes
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
