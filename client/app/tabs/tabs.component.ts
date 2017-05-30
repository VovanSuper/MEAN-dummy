import { Component, OnInit, ChangeDetectionStrategy, AfterContentInit, OnDestroy } from '@angular/core';
import { ApiService } from '../shared';

@Component({
  selector: 'em-tabs',
  templateUrl: './tabs.component.html',
  styles: [`
  `]
})
export class TabularComponent implements AfterContentInit, OnInit {

  public tabs: any[] = []

  constructor(private apiService: ApiService) { }

  ngAfterContentInit() {
    //this.tabs[0].active = true;
  }
  ngOnInit() {
    this.apiService.getEvents().then(resp => {
      let events = resp as any[];
      events.forEach(ev => {
        this.tabs.push({
          id: ev._id,
          heading: ev.name,
          active: false
        })
      })
    }).catch(err => {
      console.log('ERROR WHILE CALLING API /EVENTS/ALL');
      console.log(JSON.stringify(err));
    })
  }
}
