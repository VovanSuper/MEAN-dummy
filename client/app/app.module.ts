import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 //import { TabsModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header';

import { EventsComponent, EventComponent, EventDetailsComponent } from './events';
import { NotfoundComponent } from './notfound';
import { APP_ROUTING } from './routes';
import { ApiService } from './shared';

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
    
    APP_ROUTING
  ],
  providers: [ ApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
