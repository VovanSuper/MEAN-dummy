import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }
  
  public getEvents() {
    return this.http.get('events/all').map(result => result.json()).toPromise();
  }
}