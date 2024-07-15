import { Component, Injector } from '@angular/core';
import {
  DataTableColumns,
  DataTableRowType,
  conditionalAction,
} from '../../../../data-model/data-table.model';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { ConfirmationService } from 'primeng/api';
import { BlogRes } from '../../../../data-model/blog.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-blogs-page',
  templateUrl: './all-blogs-page.component.html',
  styleUrl: './all-blogs-page.component.scss',
})
export class AllBlogsPageComponent {
  isPuplishPage!: boolean;
  route: ActivatedRoute;

  cols: DataTableColumns[] = [];
  blogId: ID = '';
  blogs: {}[] = [];
  display: boolean = false;
  action: string = 'new';
  pageTitle!: string;
  apiString!: string;

  changeBlogStatusAction: conditionalAction[] = [
    {
      actionFunction: 'changeBlogStatus',
      icon: 'fa fa-file-import',
      isConditionalAction: true,
      style: 'btn text-success rounded-circle text-center p-0',
    },
  ];
  constructor(
    private blogService: CrudService,
    private confirmationService: ConfirmationService,
    injector: Injector,
    private router: Router
  ) {
    this.route = injector.get(ActivatedRoute);
    this.isPuplishPage = this.route.snapshot.data['isPuplishPage'];
    this.pageTitle = this.route.snapshot.data['pageTitle'];
    this.apiString = this.route.snapshot.data['api'];
  }
  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.cols = [
      { field: 'title', header: 'title', rowType: DataTableRowType.NORMAL },
      {
        field: 'authorName',
        header: 'Author Name',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'mainCategory',
        header: 'Categories',
        rowType: DataTableRowType.NORMAL,
        style: { maxWidth: '200px', 'word-wrap': 'break-word' },
      },
      {
        field: 'tags',
        header: 'Tags',
        rowType: DataTableRowType.NORMAL,
        style: { maxWidth: '200px', 'word-wrap': 'break-word' },
      },
      {
        field: 'updatedAt',
        header: 'Updated At',
        rowType: DataTableRowType.DATE,
      },
    ];

    if (this.isPuplishPage) {
      this.blogService
        .getAll<BlogRes>(`${this.apiString}/blog`)
        .subscribe((res) => {
          if (res.success) {
            this.blogs = res.result;
          }
        });
    } else {
      this.blogService
        .getAll<BlogRes>(`${this.apiString}/blog/draft`)
        .subscribe((res) => {
          if (res.success) {
            this.blogs = res.result;
          }
        });
    }
  }
  callAction(data: any) {
    let idsArr = data.action == 'deleteMultiple' ? data.id : [];
    this.blogId = data.action != 'deleteMultiple' ? data.id : null;
    switch (data.action) {
      case 'details':
        this.action = 'details';
        this.display = true;
        break;
      case 'edit':
        // this.action = 'edit';
        // this.display = true;
      this.router.navigate(['/authentication/adminpanel/edit-blog'], { state: { id: data.id } });
        break;
      case 'delete':
        this.delete();
        break;
      case 'deleteMultiple':
        this.deleteMultiple(idsArr);
        break;
      case 'changeBlogStatus':
        this.changeBlogStatusFunction();
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
        this.blogService
          .delete(this.blogId, `${this.apiString}/blog`)
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
        this.blogService
          .deleteMultiple({ postIds: idsArr }, `${this.apiString}/blog`)
          .subscribe((res) => {
            if (res.success) {
              this.close();
            }
          });
      },
    });
  }

  changeBlogStatusFunction() {
    this.confirmationService.confirm({
      message: this.isPuplishPage
        ? 'Do you want to draft this blog ?'
        : 'Do you want to publish this blog ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blogService
          .update({}, this.blogId, `${this.apiString}/blog/status`)
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
    this.getAllBlogs();
  }
}
