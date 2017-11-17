import { AbstractControl } from '@angular/forms';

export class Validation {

  static passwordStrength(control: AbstractControl) {
    if (Validation.isEmptyValue(control.value)) {
      return null;
    }
    if (!control.value.match(/^(?=.*[A-Z])[a-zA-Z0-9!@#\$ %\^&\*]{5,50}$/)) {
      return { 'weakPassword': true };
    }
    return null;
  }
  static isEmptyValue(value) {
    return value == null ||
      typeof value === 'string' && value.length === 0;
  }
}