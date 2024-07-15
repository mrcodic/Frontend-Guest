import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CrudService } from '../../../../../service/crud.service';
import { ID } from '../../../../../shared/ServicesBase';
import { AddedSocialData, CMSAddSocial, CMSEditSocial } from '../../../../../data-model/cms.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cms-edit-social',
  templateUrl: './cms-edit-social.component.html',
  styleUrl: './cms-edit-social.component.scss',
})
export class CmsEditSocialComponent {
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

  currentId: string = '';
  socialData: any;

  constructor(
    private socialService: CrudService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentId = history.state.id;
    this.getData();
    this.initializeForm();
  }

  getData(){
    this.socialService
      .getByID<AddedSocialData>(this.currentId, 'admin/cms/social/form')
      .subscribe((res) => {
        this.socialData = res.result;
        console.log(this.socialData)
        this.socialForm.patchValue({
            _id: this.currentId,
            title: this.socialData.title,
            titleAr: this.socialData.titleAr,
            content: this.socialData.content,
            contentAr: this.socialData.contentAr,
            image: this.socialData.image,
          });
  
      });
  }

  initializeForm() {
    this.socialForm = this.fb.group({
        _id: [null, Validators.required],
      title: [null, Validators.required],
      titleAr: [null, Validators.required],
      content: [null, Validators.required],
      contentAr: [null, Validators.required],
      image: ['', Validators.required],
    });
  }

  formSubmitted() {
    if (this.socialForm.valid) {
      let socialData: CMSEditSocial = {
        _id: this.currentId,
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
      .update<CMSEditSocial>(data, this.currentId, 'admin/cms/social/form')
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
