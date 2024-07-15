import { Component } from '@angular/core';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddedSocialData, CMSHeaderSocial } from '../../../../data-model/cms.model';
import { DataTableColumns, DataTableRowType } from '../../../../data-model/data-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms-social-page',
  templateUrl: './cms-social-page.component.html',
  styleUrl: './cms-social-page.component.scss',
})
export class CmsSocialPageComponent {
  pageTitle: string = 'Social page';

  [key: string]: any;
  socialId!: ID;
  headerLabel!: string;
  headerLabelAr!: string;
  dataImage: { image: string | null; base64Image: string } = {
    image: '',
    base64Image: '',
  };
  title!: string;
  content!: string;
  titleAr!: string;
  contentAr!: string;
  headerImage: { image: string | null; base64Image: string } = {
    image: '',
    base64Image: '',
  };

  // new social responsibilities
  cols: DataTableColumns[] = [];
  _id: ID = '';
  socialData: {}[] = [];
  display: boolean = false;
  action: string = 'new';

  constructor(
    private socialService: CrudService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHeaderData();
    this.getAllUsers();
  }

  getHeaderData() {
    this.socialService
      .getByID<CMSHeaderSocial>('', 'admin/cms/social/header')
      .subscribe((res) => {
        if (res.success) {
          this.headerLabel = res.result.label;
          this.headerLabelAr = res.result.labelAr;
          this.headerImage.image = res.result.image;

        }
      });
  }

  formSubmitted() {
    let updateData: CMSHeaderSocial = {
        image: this.headerImage.base64Image
          ? this.headerImage.base64Image
          : null,
        label: this.headerLabel,
        labelAr: this.headerLabelAr,
    };
    this.callCrudApi(updateData);
  }

  fileUploaded(data: any, image: string) {
    if (this.hasOwnProperty(image)) {
      this[image].base64Image = data.imageBase64;
    }
  }

  reloadPage() {
    window.location.reload();
  }
  callCrudApi(data: any) {
    // debugger
    this.socialService
      .patch<CMSHeaderSocial>(data, 'admin/cms/social/header')
      .subscribe((res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          // this.reloadPage();
        }
      });
  }

  getAllUsers() {
    this.cols = [
      {
        field: 'title',
        header: 'Title',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'createdAt',
        header: 'Created At',
        rowType: DataTableRowType.DATE,
      },
    ];

    this.socialService.getAll<AddedSocialData>('admin/cms/social/form').subscribe((res) => {
      if (res.success) {
        this.socialData = res.result;
      }
    });
  }
  callAction(data: any) {
    this._id = data.action != 'deleteMultiple' ? data.id : null;
    switch (data.action) {
      case 'add':
        this.router.navigate(['/authentication/adminpanel/cms-social/cms-add-social']);
        break;
      case 'edit':
        this.router.navigate(['/authentication/adminpanel/cms-social/cms-edit-social'], { state: { id: data.id } });
        break;
      case 'delete':
        this.delete();
        break;
      default:
        break;
    }
  }
  delete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.socialService.delete(this._id, 'admin/cms/social/form').subscribe((res) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.close();
          }
        });
      },
    });
  }

  close() {
    this.display = false;
    this.getAllUsers();
  }
}
