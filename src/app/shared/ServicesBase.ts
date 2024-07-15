import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';

import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { AppConfigService } from '../app-config/app-config.service';
import { AppInjector } from '../app.module';
import { MessageService } from 'primeng/api';

export interface DropDownObj {
  name: string | undefined;
  _id: string | undefined;
}
export interface IResponse<T> {
  message: string;
  result: T;
  status: number;
  success: boolean;
}
export type ID = string;

export abstract class ServicesBase {
  BACKEND: string | undefined;

  http: HttpClient;
  appConfigServices: AppConfigService;

  optionsConfig: {} = {
    observe: 'response',
    responseType: 'blob',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    }),
  };

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    this.appConfigServices = injector.get(AppConfigService);
    this.BACKEND = this.appConfigServices?.appConfig?.baseURL;
  }
}

export const jsonParseReviver: ((key: string, value: any) => any) | undefined =
  undefined;

export function GeneralProcessAPI<T>(
  response: HttpResponseBase
): Observable<any> {
  const status = response.status;
  const responseBlob =
    response instanceof HttpResponse
      ? response.body
      : (response as any).error instanceof Blob
      ? (response as any).error
      : undefined;

  let _headers: any = {};

  if (response.headers) {
    for (let key of response.headers.keys()) {
      _headers[key] = response.headers.get(key);
    }
  }
  if (status === 200 || status === 201) {
    return blobToText(responseBlob).pipe(
      _observableMergeMap((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ''
            ? null
            : (JSON.parse(_responseText, jsonParseReviver) as T);
        if (
          result200?.message &&
          result200.message != 'success' &&
          !/^\d+$/.test(result200?.message)
        ) {
          // summury needs translate
          // messageService().add({
          //   severity: 'success',
          //   summary: ' success',
          //   detail: result200?.message,
          //   life: 3000,
          // });
        }
        return _observableOf(result200);
      })
    );
  } else if (status == 500) {
    //summury needs translate
    // messageService().add({
    //   severity: 'error',
    //   summary: 'failed',
    //   detail: 'An unexpected server error occurred.',
    //   life: 3000,
    // });
    return new Observable<string>();
  } else if (status !== 200 && status !== 204) {
    return blobToText(responseBlob).pipe(
      _observableMergeMap((_responseText) => {
        return throwException(
          'An unexpected server error occurred.',
          status,
          _responseText,
          _headers
        );
      })
    );
  }
  return _observableOf<T>(null as any);
}

export function messageService(): MessageService {
  return AppInjector.get(MessageService);
}

export function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
export function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  var res = response ? JSON.parse(response) : null;
  var errorMSG = res?.message ? res.message : res?.title;
  if (errorMSG == null || errorMSG == undefined) {
    if (status == 401) {
      // messageService().add({
      //   severity: 'error',
      //   summary: status.toString(),
      //   detail: 'you are not Authorized',
      //   life: 3000,
      // });
    } else {
      // messageService().add({
      //   severity: 'error',
      //   summary: status.toString(),
      //   detail: message,
      //   life: 3000,
      // });
    }
  } else {
    // messageService().add({
    //   severity: 'error',
    //   summary: status.toString(),
    //   detail: errorMSG,
    //   life: 3000,
    // });
  }
  return _observableThrow(errorMSG);
}
