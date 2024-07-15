import { NgModule } from '@angular/core';
import { AuthModuleRoutingModule } from '../routing/auth-module-routing.module';
import { SharedAppModule } from './shared-module.module';
import { LoginComponent } from '../pages/auth/login/login.component';
import { DashboardPageComponent } from '../pages/auth/dashboard-page/dashboard-page.component';
import { AdminpanelLayoutComponent } from '../pages/adminpanel-layout/adminpanel-layout.component';
import { UsersPageComponent } from '../pages/auth/users-page/users-page.component';
import { UserDialogContentComponent } from '../component/auth/user-dialog-content/user-dialog-content.component';
import { DraftsPageComponent } from '../pages/auth/blogs/drafts-page/drafts-page.component';
import { AllBlogsPageComponent } from '../pages/auth/blogs/all-blogs-page/all-blogs-page.component';
import { TagsPageComponent } from '../pages/auth/tags-page/tags-page.component';
import { CategoryPageComponent } from '../pages/auth/category-page/category-page.component';
import { TagDialogContentComponent } from '../component/auth/tag-dialog-content/tag-dialog-content.component';
import { CategoryDialogContentComponent } from '../component/auth/category-dialog-content/category-dialog-content.component';
import { BlogDialogContentComponent } from '../component/auth/blog-dialog-content/blog-dialog-content.component';
import { ContactUsDialogContentComponent } from '../component/auth/contact-us-dialog-content/contact-us-dialog-content.component';
import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';
import { CmsBoardPageComponent } from '../pages/auth/CMS/cms-board-page/cms-board-page.component';
import { CmsTeamPageComponent } from '../pages/auth/CMS/cms-team/cms-team.component';
import { CmsWhowearePageComponent } from '../pages/auth/CMS/cms-whoweare-page/cms-whoweare-page.component';
import { AuthorLayoutComponent } from '../pages/author-layout/author-layout.component';
import { CareersComponent } from '../pages/careers/careers.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { CareerDialogContentComponent } from '../component/auth/career-dialog-content/career-dialog-content.component';
import { CmsGalleryPageComponent } from '../pages/auth/CMS/cms-gallery-page/cms-gallery-page.component';
import { CmsCompaniesPageComponent } from '../pages/auth/CMS/cms-companies-page/cms-companies-page.component';
import { CmsNewsPageComponent } from '../pages/auth/CMS/cms-news-page/cms-news-page.component';
import { CmsSocialPageComponent } from '../pages/auth/CMS/cms-social-page/cms-social-page.component';
import { CmsHomePageComponent } from '../pages/auth/CMS/cms-home-page/cms-home-page.component';
import { AddBlogComponent } from '../pages/auth/blogs/add-blog/add-blog.component';
import { ForgetChangePasswordComponent } from '../component/auth/forget-change-password/forget-change-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CmsAddSocialComponent } from '../pages/auth/CMS/cms-social-page/cms-add-social/cms-add-social.component';
import { CmsEditCompanyComponent } from '../pages/auth/CMS/cms-companies-page/cms-edit-company/cms-edit-company.component';
import { CmsEditSocialComponent } from '../pages/auth/CMS/cms-social-page/cms-edit-social/cms-edit-social.component';
import { CmsAddCompanyComponent } from '../pages/auth/CMS/cms-companies-page/cms-add-company/cms-add-company.component';
import { CmsSocialMediaComponent } from '../pages/auth/CMS/cms-settings/cms-social-media/cms-social-media.component';
import { CmsEmailsComponent } from '../pages/auth/CMS/cms-settings/cms-emails/cms-emails.component';
import { EditBlogComponent } from '../pages/auth/blogs/edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardPageComponent,
    AdminpanelLayoutComponent,
    AuthorLayoutComponent,
    UsersPageComponent,
    DraftsPageComponent,
    AllBlogsPageComponent,
    CategoryPageComponent,
    TagsPageComponent,
    ProfilePageComponent,
    CmsBoardPageComponent,
    CmsTeamPageComponent,
    CmsWhowearePageComponent,
    CmsGalleryPageComponent,
    CmsCompaniesPageComponent,
    CmsNewsPageComponent,
    CmsSocialPageComponent,
    CmsHomePageComponent,
    UserDialogContentComponent,
    TagDialogContentComponent,
    CategoryDialogContentComponent,
    BlogDialogContentComponent,
    ContactUsComponent,
    CareersComponent,
    CareerDialogContentComponent,
    ContactUsComponent,
    ContactUsDialogContentComponent,
    AddBlogComponent,
    ForgetChangePasswordComponent,
    CmsAddSocialComponent,
    CmsEditSocialComponent,
    CmsEditCompanyComponent,
    CmsAddCompanyComponent,
    CmsSocialMediaComponent,
    CmsEmailsComponent,
    EditBlogComponent
  ],
  imports: [SharedAppModule, AuthModuleRoutingModule ,NgxPaginationModule ],
})
export class AuthModuleModule {}
