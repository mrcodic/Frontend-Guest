import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudService } from '../../../../../service/crud.service';
import { ID } from '../../../../../shared/ServicesBase';
import { AddedSocialData, CMSAddSocial, CMSAddedCompany } from '../../../../../data-model/cms.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../../service/data.service';

@Component({
  selector: 'app-cms-emails',
  templateUrl: './cms-emails.component.html',
  styleUrl: './cms-emails.component.scss',
})
export class CmsEmailsComponent {
  pageTitle: string = 'Emails';

  added: boolean = false;

  senderEmailsForm!: FormGroup;
  EmailsData: any;

  recieverEmailsForm!: FormGroup;
  recieverEmailsData: any;
  email: any;

  currentId: string = '';

  options: any[] = [
    { name: 'SSL', value: 'SSL' },
    { name: 'TLS', value: 'TLS' }
];

  constructor(
    private emailsService: CrudService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dataService: DataService,
    private confirmationService: ConfirmationService ,
  ) {}

  ngOnInit(): void {
    this.currentId = history.state.id;
    this.getData();
    this.initializeSenderEmailsForm();
    this.initializerecieverEmailsForm();
  }

  getData(){
    this.emailsService
      .getAll('admin/setting/emails')
      .subscribe((res) => {
        this.EmailsData = res.result;
        this.recieverEmailsData = this.EmailsData.receiverEmails
        this.senderEmailsForm.patchValue({
            _id: this.currentId,
            fromName: this.EmailsData.senderEmail.fromName,
            fromEmail: this.EmailsData.senderEmail.fromEmail,
            smtpServer: this.EmailsData.senderEmail.smtpServer,
            port: this.EmailsData.senderEmail.port,
            securityProtocol: this.EmailsData.senderEmail.securityProtocol,
            smtpUsername: this.EmailsData.senderEmail.smtpUsername,
            smtpPassword: this.EmailsData.senderEmail.smtpPassword,
            disableCertificateVerification: this.EmailsData.senderEmail.disableCertificateVerification
          });
          if(this.recieverEmailsData){
              this.recieverEmailsForm.setControl('recieverEmailsFormArray', this.fb.array([]));
              this.recieverEmailsData.forEach((element: any)=> {
                const email = this.fb.group({
                  email: [element, Validators.required],
                });
                (this.recieverEmailsForm.get('recieverEmailsFormArray') as FormArray).push(email)
              })
          }
  
      });
  }

  

  initializeSenderEmailsForm(){
    this.senderEmailsForm = this.fb.group({
      fromName: [null, Validators.required],
      fromEmail: ['', Validators.required],
      smtpServer: ['', Validators.required],
      port: ['', Validators.required],
      securityProtocol: ['', Validators.required],
      smtpUsername: ['', Validators.required],
      smtpPassword: ['', Validators.required],
      disableCertificateVerification: [false, Validators.required]
    })
  }

  initializerecieverEmailsForm() {
    this.recieverEmailsForm = this.fb.group({
      recieverEmailsFormArray: this.fb.array([
        this.fb.group({
          email: [null, Validators.required],
        }),
      ]),
    });
  }




  onSubmit(formName:string) {
    if (formName =='senderEmailsForm'&&!this.added) {
            let obj = {
                _id: this.currentId,
              fromName: this.senderEmailsForm.value.fromName,
              fromEmail: this.senderEmailsForm.value.fromEmail,
              smtpServer: this.senderEmailsForm.value.smtpServer,
              port: this.senderEmailsForm.value.port,
              securityProtocol: this.senderEmailsForm.value.securityProtocol,
              smtpUsername: this.senderEmailsForm.value.smtpUsername,
              smtpPassword: this.senderEmailsForm.value.smtpPassword,
              disableCertificateVerification: this.senderEmailsForm.value.disableCertificateVerification
              }
            // console.log(obj)
          
            this.emailsService.patch(obj, 'admin/setting/sender').subscribe((res:any)=>{
              if(res.success){
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              }
            })
    } else if (formName == 'recieverEmailsForm') {
        this.email = this.recieverEmailsForm.value;
        this.email.recieverEmailsFormArray.forEach((element: any) => {
          if (element) {
            const obj = {
              email: element.email
            };
            if (element.email) {
              const EditData = this.emailsService.patch(obj,'admin/setting/receiver/add');
              if (EditData) {
                EditData.subscribe((res: any) => {
                  if (res.success) {
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: res.message,
                    });
                    // this.reloadPage();
                    // this.getrecieverEmailsData();
                  } else {
                    // Handle error response
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: res.message,
                    });
                  }
                });
              }
            }
          }
        });
    
        // let data: CMSGallery = {
        //   _id: this.galleryId,
        //   header: {
        //     image: this.headerImage.base64Image ? this.headerImage.base64Image : null,
        //     label: this.headerLabel,
        //     labelAr: this.headerLabelAr,
        //   },
        //   gallery: this.modifiedGallery,
        // };
    
        // this.callCrudApi(data);
    }
    this.added = false;
  }

  addForm(formName: string, event: Event) {
    event.preventDefault();
    if (formName == 'recieverEmailsForm') {
      this.getEmailForm?.push(
        this.fb.group({
          email: [null, Validators.required]
        })
      );
      this.added = true;
    }
  }

  get getEmailForm() {
    return this.recieverEmailsForm.get('recieverEmailsFormArray') as FormArray;
  }

  removeForm(i: number, formName: string, event: Event) {
    event.preventDefault();
    if(formName == 'recieverEmailsForm') {
      this.added = true;
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId ={
            email:  this.getEmailForm.at(i).get('email')?.value
          } 
          if (itemId) {
            this.emailsService
              .patch(itemId, 'admin/setting/receiver/remove')
              .subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.getEmailForm.removeAt(i);
                }
              });
          }
          this.getEmailForm.removeAt(i);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
          });
        },
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
