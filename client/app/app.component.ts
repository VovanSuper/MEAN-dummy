import { Component } from '@angular/core';

@Component({
  selector: 'em-root',
  template: `
    <em-header></em-header>
    <div class="container">
      <h2 class="header">
        Workshops and Conference Agenda
      </h2>
      <div class="container">
        <div class="row">
          <div class="col-10">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class AppComponent {
  title = 'Tabular component';
}
