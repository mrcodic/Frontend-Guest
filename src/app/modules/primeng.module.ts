import { NgModule } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { StepsModule } from 'primeng/steps';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    SidebarModule,
    BreadcrumbModule,
    TabMenuModule,
    PaginatorModule,
    SelectButtonModule,
    CheckboxModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RatingModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    TooltipModule,
    SlideMenuModule,
    CardModule,
    InputNumberModule,
    InputSwitchModule,
    PasswordModule,
    FormsModule,
    ImageModule,
    TabViewModule,
    CalendarModule,
    ScrollPanelModule,
    ProgressBarModule,
    DividerModule,
    StepsModule,
    OverlayPanelModule,
    AvatarModule,
    AvatarGroupModule,
    SplitButtonModule,
    MenubarModule,
    CarouselModule,
    AccordionModule,
    PanelMenuModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
})
export class PrimeNgModule {}
