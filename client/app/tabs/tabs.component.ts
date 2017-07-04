// import { Component, OnInit, ChangeDetectionStrategy, AfterContentInit, OnDestroy } from '@angular/core';
// import { IEvent } from '../shared';
// import { ApiService } from "../events/index";

// @Component({
//   selector: 'em-tabs',
//   templateUrl: './tabs.component.html'
// })
// export class TabularComponent implements AfterContentInit, OnInit {

//   public tabs: any[] = [];

//   constructor(private api: ApiService) { }

//   ngAfterContentInit() {
//      //this.tabs[0].active = true;
//   }
//   ngOnInit() {
//     this.api.getEvents().then(resp => {
//       const events = resp['events'];
//       events.forEach(ev => {
//         this.tabs.push({
//           id: ev['_id'],
//           heading: ev.name,
//           active: false
//         });
//       });
//     });
//   }
// }
