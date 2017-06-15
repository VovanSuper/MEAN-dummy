import { Component } from '@angular/core';
const logo = require('file-loader?name=[name].[ext]!./assets/logo.png');

@Component({
  selector: 'em-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor() { }
}
