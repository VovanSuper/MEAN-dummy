import { Component } from '@angular/core';

@Component({
  template: `
    <div class="row">
      <div class="col-md-8 col-md-offset-2 col-xs-12">
        <h2> Page with requested Url does not exist! </h2>
      </div>
    </div>
  `,
  styles: [`
    h2 {
      font-color: #ccc;
      font-weight: bold;
    }
  `]
})
export class NotfoundComponent { }