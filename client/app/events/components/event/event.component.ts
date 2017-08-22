import { Component, Input } from '@angular/core';
import { IEvent } from '../../../shared/';
import { Router } from '@angular/router';

@Component({
  selector: 'em-event',
  templateUrl: 'event.component.html'
})

export class EventComponent {
  @Input() event: IEvent;
}
