import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IEvent, IUser } from '../../interfaces/';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  hostUrl = `${app.host}:${app.port}` || '//localhost:8080';
  eventsUrl = `${this.hostUrl}/events`;
  usersUrl = `${this.hostUrl}/users`;
  
  constructor(private http: Http) { }
  
  public getEvents(): Promise<IEvent[]> {
    return this.getEventsJson().then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent[]);
    }).catch(this.handleError);
  }

  public getEventById(id: string): Promise<IEvent> {
    return this.getEventByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

  public deleteEventById(id: string): Promise<boolean> {
    return this.deleteEventByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.operationStatus.toLowerCase().indexOf('removed') !== -1);
    }).catch(this.handleError);
  }

  public createEvent(event: IEvent): Promise<IEvent> {
    return this.createEventJson(event).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

  public changeEventById(id: string, newEvent: IEvent): Promise<IEvent> {
    return this.changeEventByIdJson(id, newEvent).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

  public patchEventById(id: string, newEvent: IEvent): Promise<IEvent> {
    return this.patchEventByIdJson(id, newEvent).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IEvent);
    }).catch(this.handleError);
  }

    public getUsers(): Promise<IUser[]> {
    return this.getUsersJson().then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser[]);
    }).catch(this.handleError);
  }

  public getUserById(id: string): Promise<IUser> {
    return this.getUserByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser);
    }).catch(this.handleError);
  }

  public deleteUserById(id: string): Promise<boolean> {
    return this.deleteUserByIdJson(id).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.operationStatus.toLowerCase().indexOf('removed') !== -1);
    }).catch(this.handleError);
  }

  public createUser(user: IUser): Promise<IEvent> {
    return this.createUserJson(user).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser);
    }).catch(this.handleError);
  }

  public cangeUserById(id: string, newUser: IUser): Promise<IUser> {
    return this.changeUserByIdJson(id, newUser).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser);
    }).catch(this.handleError);
  }

  public patchUserById(id: string, newUser: IUser): Promise<IUser> {
    return this.patchUserByIdJson(id, newUser).then(res => {
      if (res.err) throw new Error(res.err);
      return Promise.resolve(res.data as IUser);
    }).catch(this.handleError);
  }

  /**
  * Private methods for http crud calls to server wrapping actual server responce object 
  */
  private getEventsJson(): Promise<{ operationStatus: string, data?: IEvent[], err?: string }> {
    return this.http.get(`${this.eventsUrl}/all`).map((resp: Response) => resp.json()).toPromise();
  }
  private getEventByIdJson(id: string): Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    return this.http.get(`${this.eventsUrl}/${id}`).map((resp: Response) => resp.json()).toPromise();
  }
  private deleteEventByIdJson(id: string): Promise<{ operationStatus: string, err?: string }> {
    return this.http.delete(`${this.eventsUrl}/${id}`).map((resp: Response) => resp.json()).toPromise();
  }
  private createEventJson(event: IEvent): Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    const opts = new RequestOptions({ headers: headers });
    return this.http.post(`${this.eventsUrl}`, event, opts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private changeEventByIdJson(id: string, newEvent: IEvent): Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    const opts = new RequestOptions({ headers: headers });
    return this.http.put(`${this.eventsUrl}/${id}`, newEvent, opts).map((resp: Response) => resp.json()).toPromise();
  }
  private patchEventByIdJson(id: string, newEvent: IEvent): Promise<{ operationStatus: string, data?: IEvent, err?: string }> {
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    const opts = new RequestOptions({ headers: headers });
    return this.http.patch(`${this.eventsUrl}/${id}`, newEvent, opts).map((resp: Response) => resp.json()).toPromise();
  }

    private getUsersJson(): Promise<{ operationStatus: string, data?: IUser[], err?: string }> {
    return this.http.get(`${this.usersUrl}/all`).map((resp: Response) => resp.json()).toPromise();
  }
  private getUserByIdJson(id: string): Promise<{ operationStatus: string, data?: IUser, err?: string }> {
    return this.http.get(`${this.usersUrl}/${id}`).map((resp: Response) => resp.json()).toPromise();
  }
  private deleteUserByIdJson(id: string): Promise<{ operationStatus: string, err?: string }> {
    return this.http.delete(`${this.usersUrl}/${id}`).map((resp: Response) => resp.json()).toPromise();
  }
  private createUserJson(user: IUser): Promise<{ operationStatus: string, data?: IUser, err?: string }> {
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    const opts = new RequestOptions({ headers: headers });
    return this.http.post(`${this.usersUrl}`, user, opts)
      .map((resp: Response) => resp.json()).toPromise();
  }
  private changeUserByIdJson(id: string, newUser: IUser): Promise<{ operationStatus: string, data?: IUser, err?: string }> {
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    const opts = new RequestOptions({ headers: headers });
    return this.http.put(`${this.eventsUrl}/${id}`, newUser, opts).map((resp: Response) => resp.json()).toPromise();
  }
  private patchUserByIdJson(id: string, newUser: IUser): Promise<{ operationStatus: string, data?: IUser, err?: string }> {
    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    const opts = new RequestOptions({ headers: headers });
    return this.http.patch(`${this.usersUrl}/${id}`, newUser, opts).map((resp: Response) => resp.json()).toPromise();
  }

  private handleError(error: Response | any) {
    let errMsg: string;               // enhance with remote logger
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(`Erorr in ApiService :: ${errMsg}`);
    return Promise.reject(errMsg);
  }
}
