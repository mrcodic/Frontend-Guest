import { Component } from '@angular/core';
import {
  DataTableColumns,
  DataTableRowType,
} from '../../../data-model/data-table.model';
import { ID } from '../../../shared/ServicesBase';
import { CrudService } from '../../../service/crud.service';
import { ConfirmationService } from 'primeng/api';
import { CategoryRes } from '../../../data-model/category.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss',
})
export class CategoryPageComponent {
  cols: DataTableColumns[] = [];
  catId: ID = '';
  categories: {}[] = [];
  display: boolean = false;
  action: string = 'new';
  pageTitle: string = 'All Categories';

  constructor(
    private categoryService: CrudService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.cols = [
      { field: 'name', header: 'Name', rowType: DataTableRowType.NORMAL },
      {
        field: 'parentCategory',
        header: 'Parent Category',
        rowType: DataTableRowType.NORMAL,
      },
    ];

    this.categoryService
      .getAll<CategoryRes>('admin/category')
      .subscribe((res) => {
        if (res.success) {
          this.categories = res.result;
        }
      });
  }
  callAction(data: any) {
    let idsArr = data.action == 'deleteMultiple' ? data.id : [];
    this.catId = data.action != 'deleteMultiple' ? data.id : null;
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
        this.categoryService
          .delete(this.catId, 'admin/category')
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
        this.categoryService
          .deleteMultiple({ categoryIds: idsArr }, 'admin/category')
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
    this.getAllCategories();
  }
}
