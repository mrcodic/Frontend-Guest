import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ID } from '../../../shared/ServicesBase';
import { CrudService } from '../../../service/crud.service';
import { tagReq, tagRes } from '../../../data-model/tag.model';
import { Action } from '../../../data-model/data-table.model';
import {
  FormInputs,
  formInputsElement,
} from '../../../data-model/form-inputs.model';

@Component({
  selector: 'app-tag-dialog-content',
  templateUrl: './tag-dialog-content.component.html',
  styleUrl: './tag-dialog-content.component.css',
})
export class TagDialogContentComponent {
  @Input() action: string = Action.ADD;
  @Input() tagId!: ID;
  @Output() closeDialog = new EventEmitter<FormGroup>();

  tagFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    // role: new FormControl(null, [Validators.required]),
  });

  inputs: FormInputs[] = [
    {
      placeholder: 'Tag Name',
      formControlName: 'name',
      type: 'text',
      id: 'name',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
  ];

  constructor(private tagService: CrudService) {}

  ngOnInit(): void {
    this.setFormDataAccordingToAction();
  }

  // setting form group data according to action
  setFormDataAccordingToAction() {
    switch (this.action) {
      case 'details':
        this.getFormDataByID();
        this.tagFormGroup.disable();
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
    this.tagService
      .getByID<tagRes>(this.tagId, 'admin/tag')
      .subscribe((res) => {
        this.setFormGroupData(res.result);
      });
  }

  setFormGroupData(categoryData: any) {
    const relevantProperties: string[] = Object.keys(
      this.tagFormGroup.controls
    );
    let relevantCategoryData = Object.keys(categoryData)
      .filter((property) => relevantProperties.includes(property))
      .reduce((obj: any, key) => {
        obj[key] = categoryData[key];
        return obj;
      }, {});
    this.tagFormGroup.patchValue(relevantCategoryData);
  }

  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'add':
        let newData: tagReq = {
          ...form.value,
        };
        this.callCrudApi(newData);
        break;
      case 'edit':
        let updateData: tagReq = {
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
        this.tagService.add<tagReq>(data, 'admin/tag').subscribe((res) => {
          if (res.success) {
            this.closeDialog.emit();
          }
        });
        break;
      case 'edit':
        this.tagService
          .update<tagReq>(data, this.tagId, 'admin/tag')
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
