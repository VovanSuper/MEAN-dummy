import { Component, OnInit, ChangeDetectionStrategy, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ApiService } from '../shared';

@Component({
  selector: 'em-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs.component.html',
  styles: [`
  `]
})
export class TabularComponent implements AfterContentInit, OnInit, OnDestroy {
  subc: Subscription;
  public tabs: any[] = []

  constructor(private apiService: ApiService) { }

  ngAfterContentInit() {
    this.tabs[0].active = true;
  }
  ngOnInit() {
    this.subc = this.apiService.getEvents().subscribe(resp => {
      let events = resp as any[];
      events.forEach(ev => {
        this.tabs.push({
          heading: ev.name,
          id: ev._id,
          content: ev.content || ""
        })
      })
    });
  }
  ngOnDestroy() {
    this.subc.unsubscribe();
  }

}
