import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/module/services/';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'em-search',
  templateUrl: 'search.component.html'
})

export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchTerm: FormControl;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.searchTerm =  new FormControl('', [Validators.required, Validators.minLength(1)]);
    this.searchForm = new FormGroup({
      "searchTerm" : this.searchTerm
    });
  }

  search() {
    console.log(<string>this.searchForm.value['searchTerm']);
  }
}