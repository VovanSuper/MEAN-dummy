import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../shared/';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class UsersComponent implements OnInit {
  
  users: IUser[];

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.api.getEvents().then(resp => {
    //  if (resp.err) return this.errorService.log(resp.err);
    //  this.events = resp.data ? resp.data : [];
    //});
    this.users = this.actRoute.snapshot.data['users'];
  }

}
