import { Component } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DataTableColumns,
  DataTableRowType,
} from '../../data-model/data-table.model';
import { careerRes, careerTitle } from '../../data-model/career.model';
import { ID } from '../../shared/ServicesBase';
import * as xlsx from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../service/cms.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent {
  cols: DataTableColumns[] = [];
  carrerIds: ID = '';
  careers: {}[] = [];
  display: boolean = false;
  action: string = 'new';
  pageTitle: string = 'Careers';

  // career title
  careerTitleForm!: FormGroup;
  CareerData: any;

  constructor(
    private careersService: CrudService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private careerService: CmsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllCareers();
    this.getCareerTitleData();
    this.initializeForm();
  }
  getAllCareers() {
    this.cols = [
      {
        field: 'firstName',
        header: 'First Name',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'lastName',
        header: 'Last Name',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'email',
        header: 'Email',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'phoneNumber',
        header: 'Phone Number',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'message',
        header: 'Message',
        rowType: DataTableRowType.NORMAL,
      },
      {
        field: 'cvFile',
        header: 'CV File',
        rowType: DataTableRowType.DOWNLOAD,
      },
    ];

    this.careersService.getAll<careerRes>('admin/carrer').subscribe((res) => {
      if (res.success) {
        this.careers = res.result;
      }
    });
  }

  callAction(data: any) {
    let idsArr = data.action == 'deleteMultiple' ? data.id : [];
    this.carrerIds = data.action != 'deleteMultiple' ? data.id : null;
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
        this.careersService
          .delete(this.carrerIds, 'admin/carrer')
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
        this.careersService
          .deleteMultiple({ carrerIds: idsArr }, 'admin/carrer')
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
    this.getAllCareers();
  }

  // *export to excel
  exportExcel() {
    const data = document.getElementById("careers");
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'file.xlsx');
  }

  initializeForm() {
    this.careerTitleForm = this.fb.group({
      title: [null, Validators.required],
      titleAr: [null, Validators.required],
      paragraph: [null, Validators.required],
      paragraphAr: [null, Validators.required],
    })
  }

  getCareerTitleData() {
    this.careerService.getAll('admin/carrer/content').subscribe((res) => {
      this.CareerData = res.result;
      this.careerTitleForm.patchValue({
        title: this.CareerData.title,
        titleAr: this.CareerData.titleAr,
        paragraph: this.CareerData.paragraph,
        paragraphAr: this.CareerData.paragraphAr,
      })
    })
  }

  onTitleSubmit() {
    if (this.careerTitleForm.valid) {
      let careerData= this.careerTitleForm.value
      this.careerService.edit<careerTitle>(careerData, 'admin/carrer/content').subscribe((res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
        }
      });
    }
  }
}
