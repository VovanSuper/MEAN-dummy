import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
export declare class ApiService {
    private http;
    constructor(http: Http);
    getEvents(): Promise<any>;
}
