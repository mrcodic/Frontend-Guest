import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FormInputs,
  formInputsElement,
} from '../../../data-model/form-inputs.model';
import { CrudService } from '../../../service/crud.service';
import { MessageService } from 'primeng/api';

import { ID } from '../../../shared/ServicesBase';
import {
  contactUsReq,
  contactUsRes,
} from '../../../data-model/contactUs.model';

@Component({
  selector: 'app-contact-us-dialog-content',
  templateUrl: './contact-us-dialog-content.component.html',
  styleUrl: './contact-us-dialog-content.component.css',
})
export class ContactUsDialogContentComponent {
  @Input() action!: string;
  @Input() contactId!: ID;
  @Output() closeDialog = new EventEmitter<FormGroup>();

  fileName: string = '';
  base64Image: string = '';
  image: string = '';

  contacts: {}[] = [];
  display: boolean = false;

  contactUsFormGroup: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required]),
    subject: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });
  inputs: FormInputs[] = [
    {
      placeholder: 'Full Name',
      formControlName: 'fullName',
      type: 'text',
      id: 'fullName',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Email',
      formControlName: 'email',
      type: 'text',
      id: 'email',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'message',
      formControlName: 'message',
      type: 'text',
      id: 'message',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'subject',
      formControlName: 'subject',
      type: 'text',
      id: 'message',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
  ];
  constructor(
    private contactUsService: CrudService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.setFormDataAccordingToAction();
  }
  setFormDataAccordingToAction() {
    switch (this.action) {
      case 'details':
        this.getFormDataByID();
        this.contactUsFormGroup.disable();
        break;
      case 'edit':
        this.getFormDataByID();
        break;
      default:
        break;
    }
  }
  getFormDataByID() {
    this.contactUsService
      .getByID<contactUsRes>(this.contactId, 'admin/contact')
      .subscribe((res) => {
        this.setFormGroupData(res.result);
      });
  }

  setFormGroupData(contactUs: any) {
    const relevantProperties: string[] = Object.keys(
      this.contactUsFormGroup.controls
    );
    let relevantCategoryData = Object.keys(contactUs)
      .filter((property) => relevantProperties.includes(property))
      .reduce((obj: any, key) => {
        obj[key] = contactUs[key];
        return obj;
      }, {});
    this.contactUsFormGroup.patchValue(relevantCategoryData);
  }
  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'add':
        let newData: contactUsReq = {
          ...form.value,
        };
        this.callCrudApi(newData);
        break;
      case 'edit':
        let updateData: contactUsReq = {
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
        this.contactUsService
          .add<contactUsReq>(data, 'contact')
          .subscribe((res) => {
            if (res.success) {
              this.closeDialog.emit();
            }
          });
        break;
      case 'edit':
        this.contactUsService
          .update<contactUsReq>(data, this.contactId, 'contact')
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
