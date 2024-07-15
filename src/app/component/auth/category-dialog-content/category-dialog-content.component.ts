import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '../../../data-model/data-table.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FormInputs,
  formInputsElement,
} from '../../../data-model/form-inputs.model';
import { DDLService } from '../../../service/ddl.service';
import { CrudService } from '../../../service/crud.service';
import {
  CategoryRes,
  addCategoryReq,
} from '../../../data-model/category.model';
import { ID } from '../../../shared/ServicesBase';

@Component({
  selector: 'app-category-dialog-content',
  templateUrl: './category-dialog-content.component.html',
  styleUrl: './category-dialog-content.component.scss',
})
export class CategoryDialogContentComponent {
  @Input() action: string = Action.ADD;
  @Input() catId!: ID;
  @Output() closeDialog = new EventEmitter<FormGroup>();

  categoryFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    // role: new FormControl(null, [Validators.required]),
    parentCategory: new FormControl(null),
  });

  inputs: FormInputs[] = [
    {
      placeholder: 'Category Name',
      formControlName: 'name',
      type: 'text',
      id: 'name',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Parent Category',
      formControlName: 'parentCategory',
      type: 'text',
      id: 'subCategory',
      errorMessage: 'this field is required',
      element: formInputsElement.DROPDOWM,
      dropdownOpt: {
        options: [{ label: 'Clear', value: null }], // Option to clear selection
        optionValue: '_id',
        optionLabel: 'name',
      },
    },
  ];

  constructor(
    private categoryDDLService: DDLService,
    private categoryService: CrudService
  ) {}

  ngOnInit(): void {
    this.getCategoryddlData();
    this.setFormDataAccordingToAction();
  }

  // getting Employee dropdown values
  getCategoryddlData() {
    const inspectorInput = this.inputs.find(
      (input) => input.formControlName === 'parentCategory'
    );
    this.categoryDDLService.getDDL('category/DDL').subscribe((res) => {
      inspectorInput!.dropdownOpt!.options = res.result;
    });
  }

  // setting form group data according to action
  setFormDataAccordingToAction() {
    switch (this.action) {
      case 'details':
        this.getFormDataByID();
        this.categoryFormGroup.disable();
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
    this.categoryService
      .getByID<CategoryRes>(this.catId, 'admin/category')
      .subscribe((res) => {
        this.setFormGroupData(res.result);
      });
  }

  setFormGroupData(categoryData: any) {
    const relevantProperties: string[] = Object.keys(
      this.categoryFormGroup.controls
    );
    let relevantCategoryData = Object.keys(categoryData)
      .filter((property) => relevantProperties.includes(property))
      .reduce((obj: any, key) => {
        obj[key] = categoryData[key];
        return obj;
      }, {});
    this.categoryFormGroup.patchValue(relevantCategoryData);
  }

  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'add':
        let newData: addCategoryReq = {
          ...form.value,
        };
        this.callCrudApi(newData);
        break;
      case 'edit':
        let updateData: addCategoryReq = {
          ...form.value,
        };
        this.callCrudApi(updateData);
        break;
      default:
        break;
    }
  }

  callCrudApi(data: any) {
    switch (this.action) {
      case 'add':
        this.categoryService
          .add<addCategoryReq>(data, 'admin/category')
          .subscribe((res) => {
            if (res.success) {
              this.closeDialog.emit();
            }
          });
        break;
      case 'edit':
        this.categoryService
          .update<addCategoryReq>(data, this.catId, 'admin/category')
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
