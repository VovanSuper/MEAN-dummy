import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../shared/';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/module/services/';
import { Date } from 'core-js/library/web/timers';

@Component({
  templateUrl: 'event-create.component.html',
  styleUrls: ['event-create.component.css']
})

export class EventCreateComponent implements OnInit {
  allUsers: IUser[];
  eventForm: FormGroup;
  name: FormControl;
  startTime: FormControl;
  endTime: FormControl;
  description: FormControl;
  participants: FormArray;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUsers().then(users => this.allUsers = users);

    this.name = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.startTime = new FormControl(Date.now().toLocaleString(), [Validators.required]);
    this.endTime = new FormControl(Date.now().toLocaleString(), [Validators.required]);
    this.description = new FormControl('');
    this.participants = new FormArray([
    ]);

    this.eventForm = new FormGroup({
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      description: this.description,
      participants: this.participants
    });
  }

  create() {
    console.log(`Sending eventForm data to server `);
    console.log(JSON.stringify(this.eventForm.value));
    console.dir(this.eventForm.value);
    // this.api.createEvent(this.eventForm.value);
  }

  private reset() {
    this.eventForm.reset();
  }
}