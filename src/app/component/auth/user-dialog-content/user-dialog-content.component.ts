import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ID } from '../../../shared/ServicesBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../service/crud.service';
import { UserRole, userReq, userRes } from '../../../data-model/user.model';
import { Action } from '../../../data-model/data-table.model';
import {
  FormInputs,
  formInputsElement,
} from '../../../data-model/form-inputs.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-dialog-content',
  templateUrl: './user-dialog-content.component.html',
  styleUrl: './user-dialog-content.component.css',
})
export class UserDialogContentComponent {
  @Input() action!: string;
  @Input() userId!: ID;
  @Output() closeDialog = new EventEmitter<FormGroup>();

  fileName: string = '';
  base64Image: string = '';
  image: string = '';

  userFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    userName: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl(
      null,
      this.action == Action.ADD
        ? [Validators.required, Validators.minLength(8)]
        : null
    ),
    confirmPassword: new FormControl(
      null,
      this.action == Action.ADD
        ? [Validators.required, Validators.minLength(8)]
        : null
    ),
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
      placeholder: 'username',
      formControlName: 'userName',
      type: 'text',
      id: 'userName',
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
      placeholder: 'Password',
      formControlName: 'password',
      type: 'password',
      id: 'password',
      errorMessage: 'this field is required',
      conditionalAction: Action.EDIT,
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Confirm Password',
      formControlName: 'confirmPassword',
      type: 'password',
      id: 'confirmPassword',
      errorMessage: 'this field is required',
      conditionalAction: Action.EDIT,
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Role',
      formControlName: 'role',
      type: 'text',
      id: 'role',
      errorMessage: 'this field is required',
      element: formInputsElement.DROPDOWM,
      dropdownOpt: {
        options: Object.values(UserRole),
      },
    },
  ];

  constructor(
    private userService: CrudService,
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
        this.userFormGroup.disable();
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
    this.userService
      .getByID<userRes>(this.userId, 'admin/user')
      .subscribe((res) => {
        this.setFormGroupData(res.result);
      });
  }

  setFormGroupData(userData: any) {
    if (userData.image) {
      this.image = userData.image;
    }
    const relevantProperties: string[] = Object.keys(
      this.userFormGroup.controls
    );
    let relevantCategoryData = Object.keys(userData)
      .filter((property) => relevantProperties.includes(property))
      .reduce((obj: any, key) => {
        obj[key] = userData[key];
        return obj;
      }, {});
    this.userFormGroup.patchValue(relevantCategoryData);
  }

  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'add':
        if (this.base64Image) {
          let newData: userReq = {
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
        let updateData: userReq = {
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
    this.fileName = data.fileName;
    this.base64Image = data.imageBase64;
  }

  callCrudApi(data: any) {
    switch (this.action) {
      case 'add':
        this.userService.add<userReq>(data, 'admin/user').subscribe((res) => {
          if (res.success) {
            this.closeDialog.emit();
          }
        });
        break;
      case 'edit':
        this.userService
          .update<userReq>(data, this.userId, 'admin/user')
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
