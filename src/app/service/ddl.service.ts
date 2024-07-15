import {
  HttpHeaders,
  HttpParams,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

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
  DropDownObj,
  GeneralProcessAPI,
  IResponse,
  ServicesBase,
} from '../shared/ServicesBase';
@Injectable({
  providedIn: 'root',
})
export class DDLService extends ServicesBase {
  AUTH_BACK: string = this.BACKEND!;
  constructor(injector: Injector, private router: Router) {
    super(injector);
  }

  //*  GET DDL
  getDDL(URL: string): Observable<IResponse<DropDownObj[]>> {
    let url_ = this.AUTH_BACK + 'admin/' + URL;
    url_ = url_.replace(/[?&]$/, '');
    let options_: any = {
      ...this.optionsConfig,
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return GeneralProcessAPI(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return GeneralProcessAPI<IResponse<DropDownObj[]>>(
                response_ as any
              );
            } catch (e) {
              return _observableThrow(e) as any as Observable<
                IResponse<DropDownObj[]>
              >;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<DropDownObj[]>
            >;
        })
      );
  }
  //*  GET DDL
  getEmployeeDDL(URL: string): Observable<IResponse<DropDownObj[]>> {
    let url_ = this.AUTH_BACK + 'employee/' + URL;
    url_ = url_.replace(/[?&]$/, '');
    let options_: any = {
      ...this.optionsConfig,
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return GeneralProcessAPI(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return GeneralProcessAPI<IResponse<DropDownObj[]>>(
                response_ as any
              );
            } catch (e) {
              return _observableThrow(e) as any as Observable<
                IResponse<DropDownObj[]>
              >;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<DropDownObj[]>
            >;
        })
      );
  }
}
