import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/providers/api.service';

@Component({
  selector: 'em-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {
  conf: any;

  constructor(private actRoute: ActivatedRoute, private router: Router, private service: ApiService) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      let id = params['_id'];
      this.service.getEvents()
        .then(events => {
          let theEvent = events.filter(e => e.id = id);
          this.conf.name = theEvent.name || 'No name',
          this.conf.startTime = theEvent.startTime || 'No time',
          this.conf.endTime = theEvent.endTime || 'No end time',
          this.conf.picture = theEvent.picture || null
        })
    })
  }


    
  edit(conf: string) {
    //TODO: implement!!!
    return '';
  }
}
