import { Component, EventEmitter, Input, Output } from '@angular/core';
import { careerReq, careerRes } from '../../../data-model/career.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ID } from '../../../shared/ServicesBase';
import {
  FormInputs,
  formInputsElement,
} from '../../../data-model/form-inputs.model';
import { CrudService } from '../../../service/crud.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-career-dialog-content',
  templateUrl: './career-dialog-content.component.html',
  styleUrl: './career-dialog-content.component.css',
})
export class CareerDialogContentComponent {
  @Input() action!: string;
  @Input() carrerIds!: ID;
  @Output() closeDialog = new EventEmitter<FormGroup>();

  fileName: string = '';
  base64Image: string = '';
  image: string = '';

  careers: {}[] = [];
  display: boolean = false;

  careerFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
  });

  inputs: FormInputs[] = [
    {
      placeholder: 'First Name',
      formControlName: 'firstName',
      type: 'text',
      id: 'firstName',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Last Name',
      formControlName: 'lastName',
      type: 'text',
      id: 'lastName',
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
      placeholder: 'phone number',
      formControlName: 'phoneNumber',
      type: 'text',
      id: 'number',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
  ];

  constructor(
    private careerService: CrudService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setFormDataAccordingToAction();
  }

  // setting form group data according to action
  setFormDataAccordingToAction() {
    switch (this.action) {
      case 'details':
        this.getFormDataByID();
        this.careerFormGroup.disable();
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
    this.careerService
      .getByID<careerRes>(this.carrerIds, 'admin/carrer')
      .subscribe((res) => {
        this.setFormGroupData(res.result);
      });
  }

  setFormGroupData(careerData: any) {
    const relevantProperties: string[] = Object.keys(
      this.careerFormGroup.controls
    );
    let relevantCategoryData = Object.keys(careerData)
      .filter((property) => relevantProperties.includes(property))
      .reduce((obj: any, key) => {
        obj[key] = careerData[key];
        return obj;
      }, {});
    this.careerFormGroup.patchValue(relevantCategoryData);
  }

  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'add':
        let newData: careerReq = {
          ...form.value,
        };
        this.callCrudApi(newData);
        break;
      case 'edit':
        let updateData: careerReq = {
          ...form.value,
        };
        this.callCrudApi(updateData);
        break;
      default:
        break;
    }
  }

  fileUploaded(data: any) {
    this.fileName = data.fileName;
    this.base64Image = data.imageBase64;
  }

  callCrudApi(data: any) {
    switch (this.action) {
      case 'add':
        this.careerService.add<careerReq>(data, 'carrer').subscribe((res) => {
          if (res.success) {
            this.closeDialog.emit();
          }
        });
        break;
      case 'edit':
        this.careerService
          .update<careerReq>(data, this.carrerIds, 'admin/carrer')
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
