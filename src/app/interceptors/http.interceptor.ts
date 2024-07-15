import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import {catchError, map, finalize} from 'rxjs/operators'
import {LoadingService} from '../service/loading.service';

@Injectable()
export class HttpInterceptorOne implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const lang =
      localStorage.getItem('AlkhaldiLang') == null
        ? 'en-US'
        : localStorage.getItem('AlkhaldiLang');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('Alkhalditoken')}`,
        'Accept-Language': `${lang}`,
      },
    });

    return next.handle(request);
  }
}

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoadingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url);
    return next.handle(request).pipe(
      finalize(() => this._loading.setLoading(false, request.url)),
      );
  }
}
