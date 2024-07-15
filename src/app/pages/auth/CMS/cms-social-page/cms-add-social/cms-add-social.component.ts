import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CrudService } from '../../../../../service/crud.service';
import { ID } from '../../../../../shared/ServicesBase';
import { CMSAddSocial } from '../../../../../data-model/cms.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-add-social',
  templateUrl: './cms-add-social.component.html',
  styleUrl: './cms-add-social.component.scss',
})
export class CmsAddSocialComponent {
  pageTitle: string = 'Social';

  [key: string]: any;
  socialId!: ID;
  headerLabel!: string;
  headerLabelAr!: string;
  dataImage: { image: string | null; base64Image: string } = {
    image: '',
    base64Image: '',
  };
  title!: string;
  content!: string;
  titleAr!: string;
  contentAr!: string;
  headerImage: { image: string | null; base64Image: string } = {
    image: '',
    base64Image: '',
  };

  socialForm!: FormGroup;

  constructor(
    private socialService: CrudService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.socialForm = this.fb.group({
        title: [null, Validators.required],
        titleAr: [null, Validators.required],
        content: [null, Validators.required],
        contentAr: [null, Validators.required],
        image: ['', Validators.required],
      });
  }



  formSubmitted() {
    if (this.socialForm.valid) {
      let socialData: CMSAddSocial = {
        title: this.socialForm.value.title,
        content: this.socialForm.value.content,
        titleAr: this.socialForm.value.titleAr,
        contentAr: this.socialForm.value.contentAr,
        image: this.socialForm.value.image.startsWith("http")||this.socialForm.value.image.startsWith("https") ? null: this.socialForm.value.image ,
      };
      this.callCrudApi(socialData);
    } else {
      console.log('Form is invalid');
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
        case 'social':
          formControl = this.socialForm.get(controlName) as FormControl;
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
    }
  }
  

  reloadPage() {
    window.location.reload();
  }

  callCrudApi(data: any) {
    // debugger
    this.socialService
      .add<CMSAddSocial>(data, 'admin/cms/social/form')
      .subscribe((res) => {
        if (res.success) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message,
              });
        //   this.reloadPage();
        }
      });
  }
}
