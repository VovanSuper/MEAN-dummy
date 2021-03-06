import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { TabsModule } from 'ng2-bootstrap';

import { AppRoutes } from './app.routes';
import { SharedServicesModule } from './shared/module/';
import { EnvironmentsModule } from './shared/environment/';
import { AppComponent } from './app/app.component';
import { SearchComponent } from './search/';
import { HeaderComponent, CollapseDirective } from './header/';
import { NotfoundComponent } from './notfound/';
import { EventsModule } from './events/';
import { UsersModule } from './users/';
import { AuthModule } from './auth/';
// import { TabsComponent } from './tabs/';
// import { MainComponent } from './main/';

@NgModule({
  declarations: [
    CollapseDirective,
    HeaderComponent,
    NotfoundComponent,
    SearchComponent,
    // TabsComponent,
    // MainComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    EnvironmentsModule.forRoot(),
    SharedServicesModule.forRoot(),
    // TabsModule.forRoot(),
    AuthModule,
    EventsModule,
    UsersModule,
    AppRoutes
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
