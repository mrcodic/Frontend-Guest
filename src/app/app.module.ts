import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BannerComponent } from './component/banner/banner.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CareerComponent } from './pages/career/career.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { NewsComponent } from './pages/news/news.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SocialComponent } from './pages/social/social.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ManagementComponent } from './pages/management/management.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { LandingLayoutPageComponent } from './pages/landing-layout-page/landing-layout-page.component';
import { SharedAppModule } from './modules/shared-module.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config/app-config.service';
import { HttpInterceptorOne } from './interceptors/http.interceptor';
import { HttpRequestInterceptor } from './interceptors/http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    TimelineComponent,
    HomeComponent,
    AboutComponent,
    CareerComponent,
    GalleryComponent,
    NewsComponent,
    TeamsComponent,
    SocialComponent,
    ContactComponent,
    ManagementComponent,
    CompaniesComponent,
    LandingLayoutPageComponent
  ],
  imports: [
    SharedAppModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgressBarModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SlickCarouselModule
  ],
  providers: [
    HttpClient,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppConfig,
      deps: [AppConfigService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorOne, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
export let AppInjector: Injector;
export function initializeAppConfig(appConfigService: AppConfigService) {
  return () => appConfigService.loadAppConfig();
}
