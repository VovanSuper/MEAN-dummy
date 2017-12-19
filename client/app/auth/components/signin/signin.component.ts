import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validation, ValidateField } from '../../Validations/';
import { AuthService } from '../../../shared/module/services/';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.css']
})

export class SigninComponent implements OnInit {
  validatefield;
  signinForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5), Validation.passwordStrength]);
    this.signinForm = new FormGroup({
      'username': this.username,
      'password': this.password
    });
    this.validatefield = ValidateField;
    this.reset();
  }

  signIn() {
    console.dir(this.signinForm.value);
    this.authSvc.login(this.signinForm.value['username'], this.signinForm.value['password']).then(isloged => {
      this.router.navigateByUrl('/events');
    })
    .catch(err => console.error(err));
    this.reset();
  }

  fbLogin() {
    this.authSvc.fbLogin().then(() => {
      console.log('User has been logged in');
      this.router.navigate(['/dashboard']);
    });  }


  private reset() {
    this.signinForm.reset();
  }
}