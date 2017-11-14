import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {
  private storage = null;

  constructor() {
    if (window.localStorage) {
      this.storage = window.localStorage;
    } else {
      this.storage = window.sessionStorage;
    }
  }

  save(data: { [name: string]: any }) {
    for (let name in data) {
      if (name !== '__proto__')
        this.storage.setItem(name, data[name]);
    }
  }
  getByKey(key: string) {
    return this.storage.getItem(key);
  }
}
