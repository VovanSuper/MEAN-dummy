import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'em-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {
  conf: any;
  
  constructor(private actRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
  }

}
