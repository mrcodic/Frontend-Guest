import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PreloaderComponent } from '../component/preloader/preloader.component';
import { PrimeNgModule } from './primeng.module';
import { ConfirmationService } from 'primeng/api';
import { DataTableComponent } from '../shared/data-table/data-table.component';
import { InputFormComponent } from '../shared/input-form/input-form.component';
import { FileUploaderComponent } from '../shared/file-uploader/file-uploader.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { RichTextComponent } from '../shared/rich-text/rich-text.component';
import { ChartModule } from 'primeng/chart';
import { EditorModule } from 'primeng/editor';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [
    PreloaderComponent,
    DataTableComponent,
    InputFormComponent,
    FileUploaderComponent,
    RichTextComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxSummernoteModule, PrimeNgModule,ChartModule,EditorModule,TreeModule, NgxCaptchaModule],
  providers: [ConfirmationService],

  exports: [
    PrimeNgModule,
    CommonModule,
    PreloaderComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DataTableComponent,
    InputFormComponent,
    FileUploaderComponent,
    RichTextComponent,
    ChartModule,
    EditorModule,
    TreeModule
  ],
})
export class SharedAppModule {}
