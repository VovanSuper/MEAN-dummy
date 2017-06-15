import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IEvent } from '../';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }

  public getEvents(): Promise<IEvent[]> {
    return this.http.get('/events/all').map(result => result.json().events as IEvent[]).toPromise();
  }

  public getEventById(id: string): Promise<IEvent> {
    return this.http.get(`/events/${id}`).map(result => result.json().event as IEvent).toPromise();
  }

  public deleteEventById(id: string) : Promise<string> {
    return this.http.delete(`/events/${id}`).map(result => result.json().operationStatus).toPromise();
  }
}