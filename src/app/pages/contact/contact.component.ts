import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { contactUsReq } from '../../data-model/contactUs.model';
import { CmsService } from '../../service/cms.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm: any = FormGroup;
  siteKey:string = "6Lf1ONkpAAAAAE9M6VfwYaQUmjjcmiG3aOgaTYOJ";

  isLoading = false;

  constructor(
    private contactUsService: CmsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
        ],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      let contactData= this.contactForm.value;
      this.contactUsService
      .add<contactUsReq>(contactData, 'contact')
      .subscribe((res) => {
        this.isLoading = false;
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
       this.contactForm.reset();
       this.reloadPage();
      }
      });
      console.log(this.contactForm.value);
      // window.location.reload();
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
