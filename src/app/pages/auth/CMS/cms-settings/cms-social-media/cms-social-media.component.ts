import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CrudService } from '../../../../../service/crud.service';
import { ID } from '../../../../../shared/ServicesBase';
import { AddedSocialData, CMSAddSocial, CMSAddedCompany } from '../../../../../data-model/cms.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../../service/data.service';

@Component({
  selector: 'app-cms-social-media',
  templateUrl: './cms-social-media.component.html',
  styleUrl: './cms-social-media.component.scss',
})
export class CmsSocialMediaComponent {
  pageTitle: string = 'Social Media';

  added: boolean = false;
//   newCompanyAdded: any;

  NewCompany!: any;
  socialMediaForm!: FormGroup;

  socialData: any;

  constructor(
    private socialMediaService: CrudService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.getData();
    this.intializeSocialMediaForm();
  }

  getData(){
    this.socialMediaService
      .getAll('admin/setting/social')
      .subscribe((res) => {
        this.socialData = res.result;
        this.socialMediaForm.patchValue({
            _id: this.socialData._id,
            facebook: this.socialData.socialMedia.facebook,
            twitter: this.socialData.socialMedia.twitter,
            image: this.socialData.socialMedia.image,
            behance: this.socialData.socialMedia.behance,
            dripple: this.socialData.socialMedia.dripple,
            linkedin: this.socialData.socialMedia.linkedin,
            instagram: this.socialData.socialMedia.instagram,
            location: this.socialData.location,
          });

      });
  }



  // new add company initialize func.
  intializeSocialMediaForm(){
    this.socialMediaForm = this.fb.group({
        _id: [''],
      facebook: [null, Validators.required],
      twitter: [null, Validators.required],
      image: ['', Validators.required],
      behance: ['', Validators.required],
      dripple: ['', Validators.required],
      linkedin: ['', Validators.required],
      instagram: ['', Validators.required],
      location: ['', Validators.required],
    })
  }




  onSubmit(formName:string) {
    if (formName =='socialMediaForm'&&!this.added) {
            let obj = {
              facebook: this.socialMediaForm.value.facebook,
              twitter: this.socialMediaForm.value.twitter,
              behance: this.socialMediaForm.value.behance,
              dripple: this.socialMediaForm.value.dripple,
              linkedin: this.socialMediaForm.value.linkedin,
              instagram: this.socialMediaForm.value.instagram,
              location: this.socialMediaForm.value.location,
            }
            if(this.socialMediaForm.value._id) {
                this.dataService.sendData(obj, 'socialMediaCMS', this.socialMediaForm.value._id).subscribe((res:any)=>{
                  if(res.success){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                  }
                })
            }
            this.socialMediaService.patch(obj, 'admin/setting/social').subscribe((res:any)=>{
              if(res.success){
                this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              }
            })
            }
            this.added = false;
  }

  reloadPage() {
    window.location.reload();
  }
}
