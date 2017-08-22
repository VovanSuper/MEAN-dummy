import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { Router } from '@angular/router';
import { Toastr } from './';

export const TOASTR_TOKEN = new OpaqueToken('toastr');

@Injectable()
export class ErrorService {
  constructor(private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

  error(errMsg: string, errTitle?: string, navigateUrl = '/') {
    window.console.log(`ErrorService:: ${errMsg}`);
    this.toastr.error(errMsg, errTitle);
    this.router.navigateByUrl(navigateUrl);
  }
}