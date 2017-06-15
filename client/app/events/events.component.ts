import { Component, OnInit } from '@angular/core';
import { ApiService, IEvent } from '../shared';

@Component({
  selector: 'em-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: IEvent[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getEvents().then(evs => this.events = evs as IEvent[]);
  }

}
