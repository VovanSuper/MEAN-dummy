import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared';

@Component({
  selector: 'em-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {
  conferences: any;
  
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getEvents().then( evs =>  this.conferences = evs);
  }

}
