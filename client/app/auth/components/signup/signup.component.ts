import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateField, Validation } from '../../Validations/';

@Component({
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignupComponent implements OnInit {
  name: FormControl;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  repassword: FormControl;
  workplace: FormControl;
  validatefield;

  registrationForm: FormGroup;

  constructor() { 
    this.validatefield = ValidateField;
  }

  ngOnInit() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]);
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150),
      Validators.pattern(/^([A-Za-z0-9-_\+\.]*[a-z0-9])@([-a-z0-9\.]*[a-z0-9]){2,10}$/)
    ]);
    this.workplace = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
      Validation.passwordStrength
    ]);
    this.repassword = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
      Validation.passwordStrength      
    ]);
    this.registrationForm = new FormGroup({
      name: this.name,
      username: this.username,
      email: this.email,
      workplace: this.workplace,
      password: this.password,
      repassword: this.repassword
    });
    this.reset();
  }

  submit() {
    console.dir(this.registrationForm.value);
    this.reset();
  }

  
  private reset() {
    this.registrationForm.reset();
  }
 }