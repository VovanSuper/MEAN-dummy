import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IEvent, ErrorService } from '../shared';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  selected: number;
  events: IEvent[];
  constructor(private actRoute: ActivatedRoute, private errorService: ErrorService) { }

  ngOnInit() {
    //this.api.getEvents().then(resp => {
    //  if (resp.err) return this.errorService.log(resp.err);
    //  this.events = resp.data ? resp.data : [];
    //});
    this.events = this.actRoute.snapshot.data['events'];
  }

}
