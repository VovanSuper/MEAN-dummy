import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ApiService } from './';

@Injectable()
export class EventRouteValidService implements CanActivate {

  constructor(private router: Router, private api: ApiService) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.api.getEventById(route.params['id']).then(ev => {
        if (!ev) {
          this.router.navigateByUrl('/notfound');
          return reject(false);
        }
        return resolve(true);
      });
    });
  }
}
