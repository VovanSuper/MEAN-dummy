import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ng2-bootstrap/tabs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header';
import { TabularComponent } from './tabs';
import { ConferenceComponent, ConferencesComponent } from './conferences';
import { EventsComponent } from './events';
import { MainComponent } from './main';
import { NotfoundComponent } from './notfound';
import { WorkshopsComponent } from './workshops';
import { APP_ROUTING } from './routes';
import { ApiService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabularComponent,
    ConferenceComponent,
    ConferencesComponent,
    EventsComponent,
    MainComponent,
    NotfoundComponent,
    WorkshopsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot(),
    APP_ROUTING
  ],
  providers: [ ApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
