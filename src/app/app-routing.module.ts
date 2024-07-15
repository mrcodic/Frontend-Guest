import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialComponent } from './pages/social/social.component';
import { AboutComponent } from './pages/about/about.component';
import { CareerComponent } from './pages/career/career.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagementComponent } from './pages/management/management.component';
import { NewsComponent } from './pages/news/news.component';
import { SingleNewsComponent } from './pages/single-news/single-news.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LandingLayoutPageComponent } from './pages/landing-layout-page/landing-layout-page.component';

const routes: Routes = [
  {
    path: 'authentication',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/modules/auth-module.module').then(
        (m) => m.AuthModuleModule
      ),
  },
  {
    path: '',
    component: LandingLayoutPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'management',
        component: ManagementComponent,
      },
      {
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'career',
        component: CareerComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'news/:id',
        component: SingleNewsComponent,
      },
      {
        path: 'social',
        component: SocialComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
