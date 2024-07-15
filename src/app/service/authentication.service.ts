import { Router } from '@angular/router';
import {
  HttpHeaders,
  HttpParams,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import {
  GeneralProcessAPI,
  ID,
  IResponse,
  ServicesBase,
} from '../shared/ServicesBase';
import {
  AuthRoles,
  ILoginRequest,
  LoginResponse,
} from '../data-model/authentication.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ServicesBase {
  AUTH_BACK: string = this.BACKEND + 'auth/';
  constructor(injector: Injector, private router: Router) {
    super(injector);
  }

  //*  login
  login(body: ILoginRequest): Observable<IResponse<LoginResponse>> {
    let url_ = this.AUTH_BACK + 'login';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      ...this.optionsConfig,
      body: content_,
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return GeneralProcessAPI(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return GeneralProcessAPI<IResponse<LoginResponse>>(
                response_ as any
              );
            } catch (e) {
              return _observableThrow(e) as any as Observable<
                IResponse<LoginResponse>
              >;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<LoginResponse>
            >;
        })
      );
  }

  public handleAuthData(
    token: string,
    _id: ID,
    userName: string,
    role: AuthRoles,
    image: string
  ) {
    const decodedToken = this.getTokenPayload(token);

    let now = Date.now();
    const expirationDuration = decodedToken.exp * 1000 - now;
    const expiresIn = new Date(decodedToken.exp * 1000);

    localStorage.setItem('AlkhaldiImage', image);
    localStorage.setItem('Alkhalditoken', token);
    localStorage.setItem('Alkhaldiexp', expiresIn.toISOString());
    localStorage.setItem('AlkhaldiId', _id);
    localStorage.setItem('AlkhaldiName', userName);
    localStorage.setItem('AlkhaldiRole', role);

    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  private getTokenPayload(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  //* logout
  logout(redirect = true) {
    this.logoutApi().subscribe((res) => {
      if (res.message == 'success') {
        localStorage.removeItem('AlkhaldiRole');
        localStorage.removeItem('Alkhalditoken');
        localStorage.removeItem('Alkhaldiexp');
        localStorage.removeItem('AlkhaldiId');
        localStorage.removeItem('AlkhaldiName');
        localStorage.removeItem('AlkhaldiImage');
        if (redirect) {
          this.router.navigate(['/authentication/login']);
        }
      }
    });
  }

  //* logout api
  logoutApi(): Observable<IResponse<any>> {
    let url_ = this.AUTH_BACK + 'logout';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      ...this.optionsConfig,
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return GeneralProcessAPI(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return GeneralProcessAPI<IResponse<LoginResponse>>(
                response_ as any
              );
            } catch (e) {
              return _observableThrow(e) as any as Observable<
                IResponse<LoginResponse>
              >;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<LoginResponse>
            >;
        })
      );
  }
}
