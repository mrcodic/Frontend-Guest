import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropDownObj, ID } from '../../../shared/ServicesBase';
import { Action } from '../../../data-model/data-table.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FormInputs,
  formInputsElement,
} from '../../../data-model/form-inputs.model';
import { DDLService } from '../../../service/ddl.service';
import { CrudService } from '../../../service/crud.service';
import { BlogRes, addBlogReq } from '../../../data-model/blog.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blog-dialog-content',
  templateUrl: './blog-dialog-content.component.html',
  styleUrl: './blog-dialog-content.component.scss',
})
export class BlogDialogContentComponent {
  @Input() action!: string;
  @Input() apiString!: string;
  @Input() blogId!: ID;
  @Output() closeDialog = new EventEmitter<FormGroup>();

  subCategories: DropDownObj[] = [];
  fileName: string = '';
  base64Image: string = '';
  image: string = '';

  blogFormGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
    mainCategory: new FormControl(null, [Validators.required]),
    subCategory: new FormControl(null),
    tags: new FormControl(null),
    isPublished: new FormControl(false),
    brief: new FormControl(null),
  });

  setSubCategories = (formControl: FormGroup, inputs: FormInputs[]) => {
    const subCategoryInput = this.inputs.find(
      (input) => input.formControlName === 'subCategory'
    );
    const catIdsArr = formControl.get('mainCategory')!.value;
    const filteredSubCat = this.subCategories.filter((subCat: any) =>
      catIdsArr.includes(subCat.parentCategory)
    );
    subCategoryInput!.dropdownOpt!.options = filteredSubCat;
  };

  inputs: FormInputs[] = [
    {
      placeholder: 'Title',
      formControlName: 'title',
      type: 'text',
      id: 'title',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Category',
      formControlName: 'mainCategory',
      type: 'text',
      id: 'mainCategory',
      errorMessage: 'this field is required',
      conditinalFunction: this.setSubCategories,
      element: formInputsElement.MULTISELECT,
      dropdownOpt: {
        options: [],
        optionLabel: 'name',
        optionValue: '_id',
      },
    },
    {
      placeholder: 'Content',
      formControlName: 'content',
      type: 'text',
      id: 'content',
      errorMessage: 'this field is required',
      element: formInputsElement.TEXTEDITOR,
    },

    {
      placeholder: 'Sub Category',
      formControlName: 'subCategory',
      type: 'text',
      id: 'subCategory',
      errorMessage: 'this field is required',
      element: formInputsElement.MULTISELECT,
      dropdownOpt: {
        options: [],
        optionLabel: 'name',
        optionValue: '_id',
      },
    },
    {
      placeholder: 'Tags',
      formControlName: 'tags',
      type: 'text',
      id: 'tags',
      errorMessage: 'this field is required',
      element: formInputsElement.MULTISELECT,
      dropdownOpt: {
        options: [],
        optionLabel: 'name',
        optionValue: '_id',
      },
    },
    {
      placeholder: 'Excerpt',
      formControlName: 'brief',
      type: 'text',
      id: 'brief',
      errorMessage: 'this field is required',
      element: formInputsElement.TEXTAREA,
    },
    {
      placeholder: 'Publish',
      formControlName: 'isPublished',
      type: 'text',
      id: 'isPublished',
      errorMessage: 'this field is required',
      element: formInputsElement.SWITCH,
      conditionalAction: Action.EDIT,
    },
  ];

  constructor(
    private blogDDLService: DDLService,
    private blogService: CrudService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCategoryddlData();
    this.setFormDataAccordingToAction();
  }

  // getting Employee dropdown values
  getCategoryddlData() {
    // CATEGORIES
    const categoryInput = this.inputs.find(
      (input) => input.formControlName === 'mainCategory'
    );
    this.blogDDLService.getDDL('category/DDL').subscribe((res) => {
      categoryInput!.dropdownOpt!.options = res.result;
    });
    // SUB CATEGORIES
    this.blogDDLService.getDDL('category/sub/DDL').subscribe((res) => {
      this.subCategories = res?.result;
    });
    // TAGS
    const tagInput = this.inputs.find(
      (input) => input.formControlName === 'tags'
    );
    this.blogService.getAll<any>(`${this.apiString}/tag`).subscribe((res) => {
      tagInput!.dropdownOpt!.options = res.result;
    });
  }

  // setting form group data according to action
  setFormDataAccordingToAction() {
    switch (this.action) {
      case 'details':
        this.getFormDataByID();
        this.blogFormGroup.disable();
        break;
      case 'edit':
        this.getFormDataByID();
        break;
      default:
        break;
    }
  }

  // MANIPULATING FORM GROUP DATA

  getFormDataByID() {
    this.blogService
      .getByID<BlogRes>(this.blogId, `${this.apiString}/blog`)
      .subscribe((res) => {
        this.setFormGroupData(res.result);
        this.setSubCategories(this.blogFormGroup, this.inputs);
      });
  }

  setFormGroupData(blogData: any) {
    if (blogData.image) {
      this.image = blogData.image;
    }
    const relevantProperties: string[] = Object.keys(
      this.blogFormGroup.controls
    );
    let relevantCategoryData = Object.keys(blogData)
      .filter((property) => relevantProperties.includes(property))
      .reduce((obj: any, key) => {
        obj[key] = blogData[key];
        return obj;
      }, {});
    this.blogFormGroup.patchValue(relevantCategoryData);
  }

  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'add':
        if (this.base64Image) {
          let newData: addBlogReq = {
            ...form.value,
            image: this.base64Image,
          };
          this.callCrudApi(newData);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Image is required',
          });
        }
        break;
      case 'edit':
        let updateData: addBlogReq = {
          ...form.value,
          image: this.base64Image ? this.base64Image : null,
        };
        this.callCrudApi(updateData);
        break;
      default:
        break;
    }
  }

  fileUploaded(data: any) {
    // debugger;
    this.fileName = data.fileName;
    this.base64Image = data.imageBase64;
  }

  callCrudApi(data: any) {
    switch (this.action) {
      case 'edit':
        this.blogService
          .update<addBlogReq>(data, this.blogId, `${this.apiString}/blog`)
          .subscribe((res) => {
            if (res.success) {
              this.closeDialog.emit();
            }
          });
        break;
      default:
        break;
    }
  }
}
