import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CrudService } from '../../../service/crud.service';
import { ConfirmationService } from 'primeng/api';
import { userRes } from '../../../data-model/user.model';
import { ID } from '../../../shared/ServicesBase';
import {
  DataTableColumns,
  DataTableRowType,
} from '../../../data-model/data-table.model';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {
  cols: DataTableColumns[] = [];
  userId: ID = '';
  users: {}[] = [];
  display: boolean = false;
  action: string = 'new';
  pageTitle: string = 'All users';

  constructor(
    private userService: CrudService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.cols = [
      { field: 'image', header: 'Image', rowType: DataTableRowType.IMAGE },
      {
        field: 'fullName',
        header: 'Full Name',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'userName',
        header: 'Username',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'role',
        header: 'Role',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'email',
        header: 'Email',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'updatedAt',
        header: 'Updated At',
        rowType: DataTableRowType.DATE,
      },
    ];

    this.userService.getAll<userRes>('admin/user').subscribe((res) => {
      if (res.success) {
        this.users = res.result;
      }
    });
  }
  callAction(data: any) {
    let idsArr = data.action == 'deleteMultiple' ? data.id : [];
    this.userId = data.action != 'deleteMultiple' ? data.id : null;
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
        this.userService.delete(this.userId, 'admin/user').subscribe((res) => {
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
        this.userService
          .deleteMultiple({ userIds: idsArr }, 'admin/user')
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
    this.getAllUsers();
  }
}
