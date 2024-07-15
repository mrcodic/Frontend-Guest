import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FormInputs,
  formInputsElement,
} from '../../../data-model/form-inputs.model';
import { CrudService } from '../../../service/crud.service';
import { MessageService } from 'primeng/api';
import { ChangePassReq } from '../../../data-model/user.model';

@Component({
  selector: 'app-forget-change-password',
  templateUrl: './forget-change-password.component.html',
  styleUrl: './forget-change-password.component.scss',
})
export class ForgetChangePasswordComponent {
  @Input() action!: string;
  @Input() apiString!: string;
  @Output() closeDialog = new EventEmitter<FormGroup>();

  passwordFormGroup: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  inputs: FormInputs[] = [
    {
      placeholder: 'Old Password',
      formControlName: 'oldPassword',
      type: 'password',
      id: 'oldPassword',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Password',
      formControlName: 'newPassword',
      type: 'password',
      id: 'newPassword',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
    {
      placeholder: 'Confirm Password',
      formControlName: 'confirmPassword',
      type: 'password',
      id: 'confirmPassword',
      errorMessage: 'this field is required',
      element: formInputsElement.INPUT,
    },
  ];

  constructor(
    private passwordService: CrudService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'changePass':
        let newData: ChangePassReq = {
          ...form.value,
        };
        // console.log(newData);
        this.callCrudApi(newData);
        break;
      case 'edit':
        // let updateData: addBlogReq = {
        // ...form.value,
        // image: this.base64Image ? this.base64Image : null,
        // };
        // this.callCrudApi(updateData);
        break;
      default:
        break;
    }
  }

  callCrudApi(data: any) {
    switch (this.action) {
      case 'changePass':
        this.passwordService
          .update<ChangePassReq>(
            data,
            '',
            `${this.apiString}/user/reset-password`
          )
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
