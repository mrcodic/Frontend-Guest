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
  GeneralProcessAPI,
  ID,
  IResponse,
  ServicesBase,
} from '../shared/ServicesBase';
@Injectable({
  providedIn: 'root',
})
export class CrudService extends ServicesBase {
  constructor(injector: Injector, private router: Router) {
    super(injector);
  }

  //*  GET ALL
  getAll<T>(BACK_URL: string): Observable<IResponse<T[]>> {
    let url_ = this.BACKEND + BACK_URL;

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
              return GeneralProcessAPI<IResponse<T[]>>(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<IResponse<T[]>>;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              IResponse<T[]>
            >;
        })
      );
  }
  //*  GET BY ID
  getByID<T>(id: ID, BACK_URL: string): Observable<IResponse<T>> {
    let url_ = this.BACKEND + BACK_URL + '/' + id;

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

  //*  Add
  add<T>(body: T, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.BACKEND + BACK_URL;

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

  //*  Update
  update<T>(body: T, id: ID, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.BACKEND + BACK_URL + '/' + id;

    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      ...this.optionsConfig,
      body: content_,
      params: new HttpParams().set('', id),
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

  // patch without id
  patch<T>(body: T, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.BACKEND + BACK_URL;

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

  // DELETE
  delete(id: ID, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.BACKEND + BACK_URL + '/' + id;

    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      ...this.optionsConfig,
      params: new HttpParams().set('', id),
    };

    return this.http
      .request('delete', url_, options_)
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
  // DELETE
  deleteMultiple(body: any, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.BACKEND + BACK_URL;

    const content_ = JSON.stringify(body);
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      ...this.optionsConfig,
      body: content_,
    };

    return this.http
      .request('delete', url_, options_)
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

  //*  ADD TO AN ID
  addToID<T>(body: T, id: ID, BACK_URL: string): Observable<IResponse<ID>> {
    let url_ = this.BACKEND + BACK_URL + '/' + id;

    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      ...this.optionsConfig,
      body: content_,
      params: new HttpParams().set('', id),
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
}
