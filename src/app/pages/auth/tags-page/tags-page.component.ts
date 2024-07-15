import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CrudService } from '../../../service/crud.service';
import { ID } from '../../../shared/ServicesBase';
import { Table } from 'primeng/table';
import { userRes } from '../../../data-model/user.model';
import {
  DataTableColumns,
  DataTableRowType,
} from '../../../data-model/data-table.model';
import { tagRes } from '../../../data-model/tag.model';

@Component({
  selector: 'app-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.css',
})
export class TagsPageComponent {
  cols: DataTableColumns[] = [];
  tagId: ID = '';
  tags: {}[] = [];
  display: boolean = false;
  action: string = 'new';
  pageTitle: string = 'All Tags';

  constructor(
    private tagService: CrudService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags() {
    this.cols = [
      { field: 'name', header: 'Name', rowType: DataTableRowType.NORMAL },
    ];

    this.tagService.getAll<tagRes>('admin/tag').subscribe((res) => {
      if (res.success) {
        this.tags = res.result;
      }
    });
  }
  callAction(data: any) {
    let idsArr = data.action == 'deleteMultiple' ? data.id : [];
    this.tagId = data.action != 'deleteMultiple' ? data.id : null;
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
        this.tagService.delete(this.tagId, 'admin/tag').subscribe((res) => {
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
        this.tagService
          .deleteMultiple({ tagIds: idsArr }, 'admin/tag')
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
    this.getAllTags();
  }
}
