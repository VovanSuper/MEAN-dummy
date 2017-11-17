import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validation, ValidateField } from '../../Validations/';

@Component({
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.css']
})

export class SigninComponent implements OnInit {
  validatefield;
  signinForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor() { }

  ngOnInit() {
    this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5), Validation.passwordStrength]);
    this.signinForm = new FormGroup({
      username: this.username,
      password: this.password
    });
    this.validatefield = ValidateField;
    this.reset();
  }

  register() {
    console.dir(this.signinForm.value);
    this.reset();
  }


  private reset() {
    this.signinForm.reset();
  }
}