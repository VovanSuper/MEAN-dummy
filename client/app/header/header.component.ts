import { Component } from '@angular/core';
require('file?name=[name].[ext]!./assets/logo.png');

@Component({
  selector: 'em-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor() { }
}
