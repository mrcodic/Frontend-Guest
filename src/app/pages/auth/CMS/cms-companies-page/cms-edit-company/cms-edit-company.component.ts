import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CrudService } from '../../../../../service/crud.service';
import { ID } from '../../../../../shared/ServicesBase';
import { AddedSocialData, CMSAddSocial, CMSAddedCompany } from '../../../../../data-model/cms.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../../service/data.service';

@Component({
  selector: 'app-cms-edit-company',
  templateUrl: './cms-edit-company.component.html',
  styleUrl: './cms-edit-company.component.scss',
})
export class CmsEditCompanyComponent {
  pageTitle: string = 'Company';

  added: boolean = false;
  newCompanyAdded: any;

  NewCompany!: any;
  newCompanyForm!: FormGroup;

  currentId: string = '';
  companyData: any;

  constructor(
    private companyService: CrudService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dataService: DataService, 
  ) {}

  ngOnInit(): void {
    this.currentId = history.state.id;
    this.getData();
    this.initializeNewCompanyForm();
  }

  getData() {
    this.companyService
      .getByID<CMSAddedCompany>(this.currentId, 'admin/cms/company')
      .subscribe((res) => {
        this.companyData = res.result;
        console.log(this.companyData);
        this.newCompanyForm.patchValue({
          _id: this.currentId,
          name: this.companyData.name,
          nameAr: this.companyData.nameAr,
          image: this.companyData.image,
          bio: this.companyData.bio,
          bioAr: this.companyData.bioAr,
          website: this.companyData.website,
          logo: this.companyData.logo,
          supportImage: this.companyData.supportImage,
          brochuresPdf: this.companyData.brochuresPdf,
          detailsPdf: this.companyData.detailsPdf,
        });

        if (this.companyData.imageWithLabel) {
          const imageWithLabelArray = this.newCompanyForm.get('imageWithLabel') as FormArray;
          this.companyData.imageWithLabel.forEach((element: any) => {
            imageWithLabelArray.push(this.createImageWithLabelGroup(element));
          });
        }
      });
  }

  initializeNewCompanyForm() {
    this.newCompanyForm = this.fb.group({
      name: [null, Validators.required],
      nameAr: [null, Validators.required],
      image: ['', Validators.required],
      bio: ['', Validators.required],
      bioAr: ['', Validators.required],
      website: ['', Validators.required],
      logo: ['', Validators.required],
      supportImage: ['', Validators.required],
      brochuresPdf: ['', Validators.required],
      detailsPdf: ['', Validators.required],
      imageWithLabel: this.fb.array([]),
      recieverEmailsFormArray: this.fb.array([
        this.fb.group({
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          image: [null, Validators.required],
        }),
      ]),
    });
  }

  get imageWithLabel(): FormArray {
    return this.newCompanyForm.get('imageWithLabel') as FormArray;
  }

  createImageWithLabelGroup(imageWithLabelData: { label: any; labelAr: any; image: any; }): FormGroup {
    return this.fb.group({
      label: [imageWithLabelData.label, Validators.required],
      labelAr: [imageWithLabelData.labelAr, Validators.required],
      image: [imageWithLabelData.image, Validators.required],
    });
  }

  onSubmit(formName: string) {
    if (formName == 'newCompanyForm' && !this.added) {
      let obj = {
        _id: this.currentId,
        name: this.newCompanyForm.value.name,
        nameAr: this.newCompanyForm.value.nameAr,
        image: this.newCompanyForm.value.image.startsWith("http") || this.newCompanyForm.value.image.startsWith("https") ? null : this.newCompanyForm.value.image,
        bio: this.newCompanyForm.value.bio,
        bioAr: this.newCompanyForm.value.bioAr,
        website: this.newCompanyForm.value.website,
        logo: this.newCompanyForm.value.logo.startsWith("http") || this.newCompanyForm.value.logo.startsWith("https") ? null : this.newCompanyForm.value.logo,
        supportImage: this.newCompanyForm.value.supportImage.startsWith("http") || this.newCompanyForm.value.supportImage.startsWith("https") ? null : this.newCompanyForm.value.supportImage,
        detailsPdf: this.newCompanyForm.value.detailsPdf.startsWith("http") || this.newCompanyForm.value.detailsPdf.startsWith("https") ? null : this.newCompanyForm.value.detailsPdf,
        brochuresPdf: this.newCompanyForm.value.brochuresPdf.startsWith("http") || this.newCompanyForm.value.brochuresPdf.startsWith("https") ? null : this.newCompanyForm.value.brochuresPdf,
        imageWithLabel: this.newCompanyForm.value.imageWithLabel,
      };

      obj.imageWithLabel.map((item: any) => {
        if (item.image !== null) {
          if (item.image.startsWith("http") || item.image.startsWith("https")) {
            item.image = null;
          }
        }
      });

      this.companyService.update(obj, this.currentId, 'admin/cms/company').subscribe((res: any) => {
        if (res.success) {
          this.newCompanyAdded = res.result;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company Updated Successfully' });
          this.reloadPage();
        }
      });
    }
    this.added = false;
  }

  readAsBase64(event: Event, formName: string, index?: number) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0 && index === undefined) {
      const files = Array.from(inputElement.files); // Convert FileList to array
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Value = base64String.split(',')[1]; // Split to get base64 data after comma

        const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
        let formControl = new FormControl();
        if (formName == 'NewCompany') {
          formControl = this.newCompanyForm.get(controlName) as FormControl;
        }

        if (formControl) {
          formControl.setValue(base64Value);
        } else {
          console.error(`FormControl '${controlName}' not found`);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: Event, formName: string, index?: number, label?: string) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0 && index === undefined) {
      const files = Array.from(inputElement.files); // Convert FileList to array
      let base64Value: string | string[] = '';
      const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
      let formControl = new FormControl();

      // Selecting the appropriate form control based on the formName
      switch (formName) {
        case 'NewCompany':
          formControl = this.newCompanyForm.get(controlName) as FormControl;
          break;
        // Add other cases for formName
        default:
          console.error(`FormName '${formName}' not recognized`);
          return;
      }

      if (files.length === 1) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          // Extracting base64 value from the data URL
          base64Value = base64String.split(',')[1];

          // Setting the value of the form control
          if (formControl) {
            formControl.setValue(base64Value);
          } else {
            console.error(`FormControl '${controlName}' not found`);
          }
        };

        reader.readAsDataURL(file);
      } else {
        const base64Array: { images: string }[] = [];

        // Processing multiple files
        files.forEach((file: File) => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64String = reader.result as string;
            // Extracting base64 value from the data URL
            base64Value = base64String.split(',')[1];

            base64Array.push({ "images": base64Value });
          };

          reader.readAsDataURL(file);
        });

        // Patching the value to the form control
        if (formControl) {
          formControl.patchValue(base64Array);
        } else {
          console.error(`FormControl '${controlName}' not found`);
        }
      }
    } else if (inputElement && inputElement.files && inputElement.files.length > 0 && index !== undefined && index >= 0) {
      // Handling file uploads with index (assuming it's for a FormArray)
      if (inputElement.files.length > 1) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You can only upload up to 1 image' });
        inputElement.files = null;
      } else if (inputElement.files.length === 1) {
        const files = Array.from(inputElement.files);
        const base64Value: string = '';
        const formArray = this.getWithLabel(label as any, formName);

        if (formArray) {
          const control = formArray.at(index) as FormArray;
          const controlImage = control.get('image');

          if (control) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = () => {
              const base64String = reader.result as string;
              // Extracting base64 value from the data URL
              const base64Value = base64String.split(',')[1];
              controlImage?.setValue(base64Value);
            };

            reader.readAsDataURL(file);
          } else {
            console.error("FormArray control is null.");
          }
        } else {
          console.error("FormArray is null.");
        }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You must upload at least 1 image' });
        inputElement.files = null;
      }
    }
  }

  reloadPage() {
    window.location.reload();
  }

  getWithLabel(label: string, formName: string): FormArray | any {
    if (formName == 'NewCompany') {
      const formControl = this.newCompanyForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }
  }

  removeWithLabel(i: number, formName: string, label: string) {
    const formArray = this.getWithLabel(label, formName);
    if (formArray) {
      formArray.removeAt(i);
    }
  }

  addWithLabel(label: string, formName: string) {
    let formArray = this.getWithLabel(label, formName);
    if (!formArray && formName == 'NewCompany') {
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.newCompanyForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }

    const withLabel = this.fb.group({
      label: [null, Validators.required],
      labelAr: [null, Validators.required],
      image: ['', Validators.required],
    });

    formArray.push(withLabel); // Push the new form group to the FormArray
    this.added = true;
  }
}

