// import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterContentInit } from '@angular/core';
// import { IEvent } from '../shared/interfaces/';
// import { ApiService } from '../shared/module/providers/';
// import { TabDirective } from "ng2-bootstrap";
// import { Router } from "@angular/router";

// @Component({
//   selector: 'em-tabs',
//   templateUrl: 'tabs.component.html'
// })
// export class TabsComponent implements OnInit {

//   currentEvent: TabDirective;
//   tabs: any[] = [];
//   events: IEvent[] = [];

//   constructor(private api: ApiService, private router: Router) { }

//   ngOnInit() {
//     this.api.getEvents().then(evs => {
//       this.events = evs;

//       this.events.forEach(e => {
//         this.tabs.push({
//           id: e.id,
//           heading: e.name,
//           active: false,
//           disabled: false,
//           removable: false
//         });
//       });
//     });
//   }
//   // ngAfterContentInit() {
//   //   this.router.navigateByUrl('/events');
//   //   this.tabs[0].active = true;
//   //   this.currentEvent = this.tabs[0];
//   // }

//   selectTab(tab: any) {
//     this.currentEvent = tab;
//     this.currentEvent.active = true;
//   }
//   deselectTab(tab: any) {
//     tab.active = false;
//   }


// }
