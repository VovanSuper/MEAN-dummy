import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IEvent } from '../';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  eventsUrl = 'http://localhost:8080/events';

  constructor(private http: Http) { }

  public getEvents(): Promise<{ operationStatus: string, data?: IEvent[], err?: string }> {
    return this.http.get(`${this.eventsUrl}/all`).map((resp: Response) => resp.json()).toPromise();
  }

  public getEventById(id: string): Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    return this.http.get(`${this.eventsUrl}/${id}`).map((resp: Response) => resp.json()).toPromise();
  }

  public deleteEventById(id: string): Promise<{operationStatus: string, err?: string }> {
    return this.http.delete(`${this.eventsUrl}/${id}`).map((resp: Response) => resp.json()).toPromise();
  }
}