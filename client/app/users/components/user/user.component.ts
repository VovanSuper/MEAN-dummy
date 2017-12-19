import { Component, Input } from '@angular/core';
import { IUser } from '../../../shared/';

@Component({
  selector: 'em-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})

export class UserComponent {
  @Input() user: IUser;
}
