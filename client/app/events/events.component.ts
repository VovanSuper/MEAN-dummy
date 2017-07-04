import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../shared/';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  events: IEvent[];

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.api.getEvents().then(resp => {
    //  if (resp.err) return this.errorService.log(resp.err);
    //  this.events = resp.data ? resp.data : [];
    //});
    this.events = this.actRoute.snapshot.data['events'];
  }

}
