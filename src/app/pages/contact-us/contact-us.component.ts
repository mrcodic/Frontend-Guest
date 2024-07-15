import { Component } from '@angular/core';
import {
  DataTableColumns,
  DataTableRowType,
} from '../../data-model/data-table.model';
import { ID } from '../../shared/ServicesBase';
import { CrudService } from '../../service/crud.service';
import { ConfirmationService } from 'primeng/api';
import { contactUsRes } from '../../data-model/contactUs.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  cols: DataTableColumns[] = [];
  contactId: ID = '';
  contacts: {}[] = [];
  display: boolean = false;
  action: string = 'new';
  pageTitle: string = 'Contact us';

  constructor(
    private contactUsService: CrudService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllContacts();
  }
  getAllContacts() {
    this.cols = [
      {
        field: 'fullName',
        header: 'Full Name',
        rowType: DataTableRowType.NORMAL,
      },

      {
        field: 'email',
        header: 'Email',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'message',
        header: 'Message',
        rowType: DataTableRowType.NORMAL,
      },
    ];

    this.contactUsService
      .getAll<contactUsRes>('admin/contact')
      .subscribe((res) => {
        if (res.success) {
          this.contacts = res.result;
        }
      });
  }

  callAction(data: any) {
    let idsArr = data.action == 'deleteMultiple' ? data.id : [];
    this.contactId = data.action != 'deleteMultiple' ? data.id : null;
    switch (data.action) {
      case 'add':
        this.action = 'add';
        this.display = true;
        break;
      case 'details':
        this.action = 'details';
        this.display = true;
        break;
      case 'edit':
        this.action = 'edit';
        this.display = true;
        break;
      case 'delete':
        this.delete();
        break;
      case 'deleteMultiple':
        this.deleteMultiple(idsArr);
        break;
      default:
        break;
    }
  }
  delete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contactUsService
          .delete(this.contactId, 'admin/contact')
          .subscribe((res) => {
            if (res.success) {
              this.close();
            }
          });
      },
    });
  }
  deleteMultiple(idsArr: []) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contactUsService
          .deleteMultiple({ contactIds: idsArr }, 'admin/contact')
          .subscribe((res) => {
            if (res.success) {
              this.close();
            }
          });
      },
    });
  }
  close() {
    this.display = false;
    this.getAllContacts();
  }
}
