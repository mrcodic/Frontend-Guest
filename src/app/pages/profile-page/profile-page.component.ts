import { Component, Injector } from '@angular/core';
import { Action } from '../../data-model/data-table.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FormInputs,
  formInputsElement,
} from '../../data-model/form-inputs.model';
import { profileRes } from '../../data-model/user.model';
import { CrudService } from '../../service/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  action: string = Action.EDIT;
  pageTitle: string = 'Profile';
  display: boolean = false;

  route: ActivatedRoute;
  apiString!: string;

  fileName: string = '';
  base64Image: string = '';
  image: string = '';

  profileFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    userName: new FormControl(null, [Validators.required]),
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
  ];

  constructor(private profileService: CrudService, injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.apiString = this.route.snapshot.data['api'];
  }

  ngOnInit(): void {
    this.setFormDataAccordingToAction();
  }

  // setting form group data according to action
  setFormDataAccordingToAction() {
    switch (this.action) {
      case 'edit':
        this.getFormDataByID();
        break;
      default:
        break;
    }
  }

  // MANIPULATING FORM GROUP DATA

  getFormDataByID() {
    this.profileService
      .getAll<profileRes>(`${this.apiString}/user/auth`)
      .subscribe((res) => {
        this.setFormGroupData(res.result);
      });
  }

  changePassword() {
    this.display = true;
  }

  setFormGroupData(userData: any) {
    if (userData.image) {
      this.image = userData.image;
    }
    const relevantProperties: string[] = Object.keys(
      this.profileFormGroup.controls
    );
    let relevantCategoryData = Object.keys(userData)
      .filter((property) => relevantProperties.includes(property))
      .reduce((obj: any, key) => {
        obj[key] = userData[key];
        return obj;
      }, {});
    this.profileFormGroup.patchValue(relevantCategoryData);
  }

  formSubmitted(form: FormGroup) {
    switch (this.action) {
      case 'edit':
        let updateData: any = {
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
      case 'edit':
        this.profileService
          .update<any>(data, '', `${this.apiString}/user/profile`)
          .subscribe((res) => {
            if (res.success) {
              this.setFormDataAccordingToAction();
            }
          });
        break;
      default:
        break;
    }
  }
  close() {
    this.display = false;
    // this.getAllBlogs();
  }
}
