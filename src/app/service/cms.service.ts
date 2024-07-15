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
  GeneralProcessAPI,
  ID,
  IResponse,
  ServicesBase,
} from '../shared/ServicesBase';
import { HttpResponseBase } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})

export class CmsService extends ServicesBase {
  backend:string="http://localhost:8000/api/v1/";
  constructor(injector: Injector, private router: Router) {
    super(injector);
  }
  getAll(BACK_URL: string): Observable<IResponse<any>> {
    let url_ = this.backend + BACK_URL;

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
              return GeneralProcessAPI<IResponse<[]>>(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<IResponse<[]>>;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<[]>
            >;
        })
      );
  }
  add<T>(body: T, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.backend + BACK_URL;

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
              return GeneralProcessAPI<IResponse<ID>>(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<IResponse<ID>>;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<ID>
            >;
        })
      );
  }

  edit<T>(body: T, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.backend + BACK_URL;

    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      ...this.optionsConfig,
      body: content_,
    };

    return this.http
      .request('patch', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return GeneralProcessAPI(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return GeneralProcessAPI<IResponse<ID>>(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<IResponse<ID>>;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<ID>
            >;
        })
      );
  }

  getByID<T>(id: ID, BACK_URL: string): Observable<IResponse<T>> {
    let url_ = this.backend + BACK_URL + '/' + id;

    url_ = url_.replace(/[?&]$/, '');

    // const content_ = JSON.stringify();

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
              return GeneralProcessAPI<IResponse<T>>(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<IResponse<T>>;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<T>
            >;
        })
      );
  }
}
