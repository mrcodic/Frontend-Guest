import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { AppConfig } from './AppConfig';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  appConfig: AppConfig | undefined;

  constructor(private http: HttpClient) {}

  loadAppConfig() {
    this.http
      .get<AppConfig>('/assets/url.json')
      .pipe(
        retry(2) // Retry 3 times, if fails
      )
      .subscribe(
        (data: AppConfig) => {
          // Success
          this.appConfig = { ...data };
        },
        (error) => {
          // Failure
        }
      );
  }
}
