import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../service/cms.service';
import { careerReq, careerRes, careerTitle } from '../../data-model/career.model';
import { MessageService } from 'primeng/api';
declare function UploadbTN():void;
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrl: './career.component.css'
})
export class CareerComponent {
  siteKey:string = "6Lf1ONkpAAAAAE9M6VfwYaQUmjjcmiG3aOgaTYOJ";
  careerForm: any = FormGroup;
  cvFile:any;

  CareerData: any;
  title: string = '';
  paragraph: string = '';

  isLoading = false;

  constructor(    private careerService: CmsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCareerTitle();
    UploadbTN();

    this.careerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
        ],
      ],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required]

    });
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.convertToBase64(selectedFile).then((base64String: string) => {
        // Assign the Base64 string to your object property

        this.cvFile=base64String
      });

      // Do something with the selected file, such as uploading it to a server
      console.log('Selected PDF file:', selectedFile);
    }
  }
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Get the Base64 string
        const base64String: string = reader.result as string;
        // Remove the header from the Base64 string
        const base64Content: string = base64String.split(';base64,').pop() || '';
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
    });
  }
  // onSubmit() {
  //   if (this.careerForm.valid) {
  //     let careerData= this.careerForm.value
  //     careerData.cvFile= this.cvFile
  //     this.careerService.add<careerReq>(careerData, 'carrer').subscribe((res) => {
  //       if (res.success) {
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Success',
  //           detail: res.message,
  //           });
  //         // this.reloadPage();
  //         this.careerForm.reset();
  //       }
  //     });
  //   }
  // }

  onSubmit() {
    if (this.careerForm.valid) {
      this.isLoading = true;
      let careerData = this.careerForm.value;
      careerData.cvFile = this.cvFile;

      this.careerService.add<careerReq>(careerData, 'carrer').subscribe((res) => {
        this.isLoading = false;
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.careerForm.reset();
          this.reloadPage();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      }, () => {
        this.isLoading = false; // Handle error case and stop spinner
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Form submission failed',
        });
      });
    }
  }

  getCareerTitle() {
    this.careerService.getAll('carrer/content').subscribe((res) => {
      this.CareerData = res.result;
      this.title = this.CareerData.title;
      this.paragraph = this.CareerData.paragraph;
    })
  }

  reloadPage() {
    window.location.reload();
  }

}
