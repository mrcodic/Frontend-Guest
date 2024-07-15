import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/auth/login/login.component';
import { DashboardPageComponent } from '../pages/auth/dashboard-page/dashboard-page.component';
import { AdminpanelLayoutComponent } from '../pages/adminpanel-layout/adminpanel-layout.component';
import { UsersPageComponent } from '../pages/auth/users-page/users-page.component';
import { AllBlogsPageComponent } from '../pages/auth/blogs/all-blogs-page/all-blogs-page.component';
import { TagsPageComponent } from '../pages/auth/tags-page/tags-page.component';
import { CategoryPageComponent } from '../pages/auth/category-page/category-page.component';
import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';
import { CmsBoardPageComponent } from '../pages/auth/CMS/cms-board-page/cms-board-page.component';
import { CmsTeamPageComponent } from '../pages/auth/CMS/cms-team/cms-team.component';
import { CmsWhowearePageComponent } from '../pages/auth/CMS/cms-whoweare-page/cms-whoweare-page.component';
import { AuthorLayoutComponent } from '../pages/author-layout/author-layout.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { CareersComponent } from '../pages/careers/careers.component';
import { CmsGalleryPageComponent } from '../pages/auth/CMS/cms-gallery-page/cms-gallery-page.component';
import { CmsNewsPageComponent } from '../pages/auth/CMS/cms-news-page/cms-news-page.component';
import { CmsSocialPageComponent } from '../pages/auth/CMS/cms-social-page/cms-social-page.component';
import { CmsCompaniesPageComponent } from '../pages/auth/CMS/cms-companies-page/cms-companies-page.component';
import { CmsHomePageComponent } from '../pages/auth/CMS/cms-home-page/cms-home-page.component';
import { BlogDialogContentComponent } from '../component/auth/blog-dialog-content/blog-dialog-content.component';
import { AddBlogComponent } from '../pages/auth/blogs/add-blog/add-blog.component';
import { AdminGuard, AuthorGuard } from '../guards/auth.guard';
import { CmsAddSocialComponent } from '../pages/auth/CMS/cms-social-page/cms-add-social/cms-add-social.component';
import { CmsEditCompanyComponent } from '../pages/auth/CMS/cms-companies-page/cms-edit-company/cms-edit-company.component';
import { CmsEditSocialComponent } from '../pages/auth/CMS/cms-social-page/cms-edit-social/cms-edit-social.component';
import { CmsAddCompanyComponent } from '../pages/auth/CMS/cms-companies-page/cms-add-company/cms-add-company.component';
import { CmsSocialMediaComponent } from '../pages/auth/CMS/cms-settings/cms-social-media/cms-social-media.component';
import { CmsEmailsComponent } from '../pages/auth/CMS/cms-settings/cms-emails/cms-emails.component';
import { EditBlogComponent } from '../pages/auth/blogs/edit-blog/edit-blog.component';
const routes: Routes = [
  // { path: 'authentication/login', component: LoginComponent },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'adminpanel',
    canActivateChild: [AdminGuard],
    component: AdminpanelLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'users',
        component: UsersPageComponent,
      },
      {
        path: 'all-blogs',
        component: AllBlogsPageComponent,
        data: { isPuplishPage: true, pageTitle: 'Blogs', api: 'admin' },
      },
      {
        path: 'add-blog',
        component: AddBlogComponent,
        data: { isPuplishPage: true, pageTitle: 'Blogs', api: 'admin' },
      },
      {
        path: 'edit-blog',
        component: EditBlogComponent,
        data: { isPuplishPage: true, pageTitle: 'Blogs', api: 'admin' },
      },
      {
        path: 'drafts',
        component: AllBlogsPageComponent,
        data: { isPuplishPage: false, pageTitle: 'Draft', api: 'admin' },
      },
      {
        path: 'category',
        component: CategoryPageComponent,
      },
      {
        path: 'tags',
        component: TagsPageComponent,
      },
      {
        path: 'careers',
        component: CareersComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        data: { api: 'admin' },
      },
      {
        path: 'cms-board',
        component: CmsBoardPageComponent,
      },
      {
        path: 'cms-team',
        component: CmsTeamPageComponent,
      },
      {
        path: 'cms-who-we-are',
        component: CmsWhowearePageComponent,
      },
      {
        path: 'cms-gallery',
        component: CmsGalleryPageComponent,
      },
      {
        path: 'cms-news',
        component: CmsNewsPageComponent,
      },
      {
        path: 'cms-social',
        component: CmsSocialPageComponent,
      },
      // add social
      {
        path: 'cms-social/cms-add-social',
        component: CmsAddSocialComponent,
      },
      // edit social
      {
        path: 'cms-social/cms-edit-social',
        component: CmsEditSocialComponent,
      },
      {
        path: 'cms-companies',
        component: CmsCompaniesPageComponent,
      },
      // add company
      {
        path: 'cms-companies/cms-add-company',
        component: CmsAddCompanyComponent,
      },
      // edit company
      {
        path: 'cms-companies/cms-edit-company',
        component: CmsEditCompanyComponent
      },
      {
        path: 'cms-home',
        component: CmsHomePageComponent,
      },
      {
        path: 'cms-social-media',
        component: CmsSocialMediaComponent,
      },
      {
        path: 'cms-emails',
        component: CmsEmailsComponent,
      },
    ],
  },
  {
    path: 'authorpanel',
    canActivateChild: [AuthorGuard],
    component: AuthorLayoutComponent,
    children: [
      {
        path: 'all-blogs',
        component: AllBlogsPageComponent,
        data: { isPuplishPage: true, pageTitle: 'Blogs', api: 'author' },
      },
      {
        path: 'drafts',
        component: AllBlogsPageComponent,
        data: { isPuplishPage: false, pageTitle: 'Draft', api: 'author' },
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        data: { api: 'author' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModuleRoutingModule {}
