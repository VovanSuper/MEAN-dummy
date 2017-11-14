import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEvent, IUser } from '../../../shared/';
import { ApiService } from '../../../shared/module/services/';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'event-details.component.html',
  styleUrls: ['event-details.component.css']
})

export class EventDetailsComponent implements OnInit, OnDestroy {
  event: IEvent;
  eventCreator: IUser = undefined;
  isDirty = true;                   // TODO: verification logic to be settled in here
  actRouteSubscription: Subscription = null;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  goBack() {
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.actRouteSubscription = this.actRoute.params.subscribe(param => {
      this.api.getEventById(param[ 'id' ])
      .then(evnt => this.event = evnt)
      .then(resp => this.api.getUserById(resp.createdBy))
      .then(usr => this.eventCreator = usr)
    });
  }

  ngOnDestroy() {
    this.actRouteSubscription.unsubscribe();
  }

}
