import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }
  
  public getEvents() {
    return this.http.get('events').map(result => result.json());
  }
}