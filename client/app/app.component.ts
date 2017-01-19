import { Component } from '@angular/core';

@Component({
  selector: 'em-root',
  template: `
    <em-header></em-header>
    <div class="container">
      <h2 class="heading">
        Workshops and Conference Agenda
      </h2>
      <div class="row">
        <div class="col-md-auto col-xs-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class AppComponent {
  title = 'app works!';
}
