import { Injectable, Inject } from '@angular/core';
import { UserStoreService } from './user-store.service';
import { Http, Response } from '@angular/http';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { IUser } from '../../interfaces/';
import { IToastr, HttpHelpersService, FB_TOKEN } from './';
import { TOASTR_TOKEN } from './tokens.libs';
import { EnvVariables, EnvironmentVariables } from '../../environment/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare const FB: any;

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  isLoggedChange$: BehaviorSubject<boolean>;

  constructor(
    private userStoreSvc: UserStoreService,
    private http: Http,
    private authHttp: AuthHttp,
    private httpHelpers: HttpHelpersService,
    @Inject(EnvVariables) private vars: EnvironmentVariables,
    @Inject(TOASTR_TOKEN) private toastr: IToastr,
    @Inject(FB_TOKEN) private FB: any
  ) {
    this.init();
  }
  get currentUser(): IUser {
    return this.getUser() || null;
  }

  get isAuthenticated(): boolean {
    let token = this.userStoreSvc.getToken();
    return (token !== null);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.authHttp.get(this.vars.fbMeInfoUrl).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }

  getUser(): IUser {
    if (!this.isAuthenticated)
      return null;

    this.tokenInfo(this.userStoreSvc.getToken());
    return this.userStoreSvc.getUserInfo();
  }

  logout(): void {
    this.userStoreSvc.erase();
    this.isLoggedChange$.next(false);
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.status === 'connected') {
          if (result.authResponse) {
            return this.authHttp.post(this.vars.fbLoginUrl, { access_token: result.authResponse.accessToken })
              .toPromise()
              .then(response => {
                var token = response.headers.get('x-auth-token');
                if (token) {
                  this.userStoreSvc.setToken(token);
                }
                resolve(response.json());
              })
              .catch(() => reject(null));
          } else {
            reject(null);
          }
        }
      }, { scope: 'public_profile,email' })
    });
  }

  login(username: string, password: string): Promise<boolean> {
    let body = { username, password };
    let opts = this.httpHelpers.getBaseRequestOptions();
    return new Promise((resolve, reject) => {
      this.http.post(this.vars.loginUrl, body, opts).map((resp: Response) => resp.json()).subscribe(
        (resp) => {
          let token = resp['data'] && resp['data'].token;
          if (token && token !== undefined) {
            this.tokenInfo(token);
            this.saveUser(resp['data']);
            resolve(true);
          } else {
            reject(false);
          }
        },
        (error) => {
          console.log(error);
          reject(false);
        }
      );
    });
  }

  forgotPassword(email: string): Promise<any> {
    //TODO: sanitize input from client (email)
    let body = JSON.stringify({ email });
    let opts = this.httpHelpers.getBaseRequestOptions();
    return new Promise((resolve, reject) => {
      this.http.post(this.vars.forgotPasswordUrl, body, opts).map((resp: Response) => resp.json()).subscribe(
        (resp) => resolve(resp['data'].message),
        (error) => reject(error)
      );
    });
  }

  public saveUser(data: IUser & { [token: string]: any }) {
    let user: IUser & { [token: string]: any } = {
      id: data.id,
      name: data.name,
      email: data.email,
      gender: data.gender,
      registered: data.registered,
      work_place: data.work_place,
      avatarUrl: data.avatarUrl,
      events: data.events,
      token: data.token
    };
    this.userStoreSvc.setUserInfo(user);
    this.isLoggedChange$.next(true);
  }

  private init() {
    FB.init({
      appId: 'YOUR-APP-ID',
      status: false, // the SDK will attempt to get info about the current user immediately after init
      cookie: false,  // enable cookies to allow the server to access
      // the session
      xfbml: false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
      version: 'v2.8' // use graph api version 2.5
    });
    this.isLoggedChange$ = (this.userStoreSvc.getToken()) ? new BehaviorSubject(true) : new BehaviorSubject(false);
  }

  private tokenInfo(token) {
    console.debug('[AuthenticationProvider:login] token expired?: ', this.jwtHelper.isTokenExpired(token));
    console.debug('[AuthenticationProvider:login] token decoded: ', this.jwtHelper.decodeToken(token));
    console.debug('[AuthenticationProvider:login] token exp date: ', this.jwtHelper.getTokenExpirationDate(token));
  }
}