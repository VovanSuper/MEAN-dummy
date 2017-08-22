import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEvent } from '../../../shared/';
import { ApiService } from '../../../shared/module/providers/';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'event-details.component.html'
})

export class EventDetailsComponent implements OnInit, OnDestroy {
  event: IEvent;
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
      this.api.getEventById(param[ 'id' ]).then(resp => this.event = resp);
    });
  }

  ngOnDestroy() {
    this.actRouteSubscription.unsubscribe();
  }

}
