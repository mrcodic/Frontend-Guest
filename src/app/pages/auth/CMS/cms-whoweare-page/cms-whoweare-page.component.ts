import { DataService } from './../../../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CMSWhoWeAre } from '../../../../data-model/cms.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-whoweare-page',
  templateUrl: './cms-whoweare-page.component.html',
  styleUrl: './cms-whoweare-page.component.scss',
})
export class CmsWhowearePageComponent implements OnInit{
  pageTitle: string = 'Who we are';
  whoweare!: any;
  whoweareForm!: FormGroup;
  timeline!: any;
  timelineForm!: FormGroup;
  added: boolean = false;

  // timeline header
  timelineHeaderForm!: FormGroup;
  timeLineHeader! : any;


  constructor(private dataService:DataService, private messageService: MessageService ,private fb:FormBuilder, private confirmationService: ConfirmationService ) {

    this.initializeTimelineForm();
    this.initializeTimeLineHeaderForm();

  }
  ngOnInit(): void {
    this.initializeForm();
    this.dataService.getData('whoweare').subscribe((res: any) => {
      this.whoweare = res.result;
      console.log( res.result._id);

      if(this.whoweare){
        this.whoweareForm.patchValue({
          whoweareId: res.result._id,
          whoweareTitle: res.result.title,
          whoweareTitleAr: res.result.titleAr,
          whoweareContent: res.result.content,
          whoweareContentAr: res.result.contentAr,
          whoweareImages: res.result.images,
          whoweareTimeline: res.result.timeline,
          whoweareSlider: res.result.sliderImages,
          visionImage: res.result.vision.image,
          visionContent: res.result.vision.content,
          visionContentAr: res.result.vision.contentAr,
          visionLabel: res.result.vision.label,
          visionLabelAr: res.result.vision.labelAr,
          missionImage: res.result.mission.image,
          missionContent: res.result.mission.content,
          missionContentAr: res.result.mission.contentAr,
          missionLabel: res.result.mission.label,
          missionLabelAr: res.result.mission.labelAr,
        })
      }
    });

    this.dataService.getData('whoweare').subscribe((res: any) => {
      this.timeline = res.result.timeline;
      if (this.timeline) {
        this.timelineForm.setControl('timelineFromArray', this.fb.array([]));
        this.timeline.forEach((element: any) => {
          const timeline = this.fb.group({
            _id: [element._id, Validators.required],
            year: [element.year, Validators.required],
            label: [element.label, Validators.required],
            labelAr: [element.labelAr, Validators.required],
            image: [element.image, Validators.required],
          });
          (this.timelineForm.get('timelineFromArray') as FormArray).push(
            timeline
          );
        });
      }
    });

    this.getTimeLineHeader();
  }

  get getTimelineFrom() {
    return this.timelineForm.get('timelineFromArray') as FormArray;
  }

  initializeForm(): void {
    this.whoweareForm = this.fb.group({
      whoweareId: [null, Validators.required],
      whoweareTitle: [null, Validators.required],
      whoweareTitleAr: [null, Validators.required],
      whoweareContent: [null, Validators.required],
      whoweareContentAr: [null, Validators.required],
      whoweareSlider: [[], Validators.required],
      whoweareImages: [[], Validators.required],
      visionImage: ['', Validators.required],
      visionContent: [null, Validators.required],
      visionContentAr: [null, Validators.required],
      visionLabel: [null, Validators.required],
      visionLabelAr: [null, Validators.required],
      missionImage: ['', Validators.required],
      missionContent: [null, Validators.required],
      missionContentAr: [null, Validators.required],
      missionLabel: [null, Validators.required],
      missionLabelAr: [null, Validators.required],
    });
  }


  onFileChange(event: Event, index?: number) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0 && index === undefined ) {
      const files = Array.from(inputElement.files); // Convert FileList to array
      let base64Value: string | string[] = '';
      const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
      const formControl = this.whoweareForm.get(controlName);
      if (files.length === 1 && inputElement.attributes.getNamedItem('multiple') === null) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          base64Value = base64String.substring('data:image/jpeg;base64,'.length);
          ;

          const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
          const formControl = this.whoweareForm.get(controlName);

          if (formControl) {
            formControl.setValue(base64Value);
          } else {
            console.error(`FormControl '${controlName}' not found`);
          }
        };

        reader.readAsDataURL(file);
      } else {
        const base64Array: { image: string }[] = [];

        files.forEach((file: File) => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64String = reader.result as string;
            base64Value = base64String.substring('data:image/jpeg;base64,'.length);

            base64Array.push({ "image": base64Value });


          };

          reader.readAsDataURL(file);
        });
        if (formControl) {
          formControl.patchValue(base64Array);
        } else {
          console.error(`FormControl '${controlName}' not found`);
        }
      }
  }

  }

  onImageChange(event: Event, index?: number, formName?: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      let base64Value: string | string[] = '';

      reader.onload = () => {
        const base64String = reader.result as string;
        base64Value = base64String.split(',')[1]; // Removing the data URL prefix

        // Checking file type
        const fileType = file.type;
        if (fileType.startsWith('image/')) {
          this.updateFormWithBase64(formName, index, 'image', base64Value);
        } else {
          // Handle unsupported file types
          console.error('Unsupported file type');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  updateFormWithBase64(formName: string | undefined, index: number | undefined, field: string, base64Value: string) {
    if (formName === 'timelineForm') {
      this.getTimelineFrom?.at(index as any).patchValue({ [field]: base64Value });
    }
  }

  addForm(formName: string, event: Event) {
    event.preventDefault();
    if (formName == 'timelineForm') {
      this.getTimelineFrom?.push(
        this.fb.group({
          _id: [null, Validators.required],
          year: [null, Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          image: ['', Validators.required],
        })
      );
      this.added = true;
    }
  }

  removeForm(index: number, formName: string, event: Event) {
    event.preventDefault();
    if (formName == 'timelineForm') {
      this.added = true;

      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId = this.getTimelineFrom.at(index).get('_id')?.value;
          if (itemId) {
            this.dataService
              .deleteData('homeTimeline', itemId)
              .subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.getTimelineFrom.removeAt(index);
                }
              });
          }
          this.getTimelineFrom.removeAt(index);
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

  initializeTimelineForm() {
    this.timelineForm = this.fb.group({
      timelineFromArray: this.fb.array([
        this.fb.group({
          _id: [null, Validators.required],
          year: [null, Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          image: ['', Validators.required],
        }),
      ]),
    });
  }


  onSubmit(){

    if(this.whoweareForm.value){
      let obj:any ={
        _id: this.whoweareForm.value.whoweareId,
        title: this.whoweareForm.value.whoweareTitle,
        titleAr: this.whoweareForm.value.whoweareTitleAr,
        content: this.whoweareForm.value.whoweareContent,
        contentAr: this.whoweareForm.value.whoweareContentAr,
        sliderImages: this.whoweareForm.value.whoweareSlider,
        images: this.whoweareForm.value.whoweareImages,
        vision: {
          label: this.whoweareForm.value.visionLabel,
          labelAr: this.whoweareForm.value.visionLabelAr,
          content: this.whoweareForm.value.visionContent,
          contentAr: this.whoweareForm.value.visionContentAr,
          image: this.whoweareForm.value.visionImage
        },
        mission: {
          label: this.whoweareForm.value.missionLabel,
          labelAr: this.whoweareForm.value.missionLabelAr,
          content: this.whoweareForm.value.missionContent,
          contentAr: this.whoweareForm.value.missionContentAr,
          image: this.whoweareForm.value.missionImage
        },
      }


      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const nestedObj = obj[key];
          if (nestedObj !== null && typeof nestedObj === 'object') {
            if (Array.isArray(nestedObj)) {
              nestedObj.forEach((item: any) => {
                if (item && typeof item === 'object') {
                  this.processObject(item); // recursively process each member
                }
              });
            } else {
              this.processObject(nestedObj); // process nested objects
            }
          }
        }
      }
      console.log(obj, this.whoweareForm.value.whoweareId);
      this.dataService.sendData(obj, 'whoweare', this.whoweareForm.value.whoweareId).subscribe((res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Who we are created successfully' });
          // this.reloadPage();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create who we are' });
        }
      })
  }
  }
  reloadPage(): void {
    window.location.reload();
  }
  processObject(nestedObj: any) {
    for (let prop in nestedObj) {
        if (Object.prototype.hasOwnProperty.call(nestedObj, prop)) {
            if (prop === 'images' && Array.isArray(nestedObj[prop])) {
                nestedObj[prop].forEach((image: any) => {
                    if (image && image.image && typeof image.image === 'string' && (image.image.startsWith('http://') || image.image.startsWith('https://'))) {
                        image.image = null;
                    }
                });
            } else if (typeof nestedObj[prop] === 'string' && (nestedObj[prop].startsWith('http://') || nestedObj[prop].startsWith('https://'))) {
                nestedObj[prop] = null;
            } else if (nestedObj[prop] !== null && typeof nestedObj[prop] === 'object') {
                this.processObject(nestedObj[prop]); // recursively process nested objects
            }
        }
    }
}

onSubmitTimeline(formName: string) {
  if (formName == 'timelineForm' && !this.added) {
    this.timeline = this.timelineForm.value;
    this.timeline.timelineFromArray.forEach((element: any) => {
      if (element) {
        const obj = {
          image:
            element.image.startsWith('http') ||
            element.image.startsWith('https')
              ? null
              : element.image,
          label: element.label,
          labelAr: element.labelAr,
          year: element.year,
        };
        console.log(element._id);
        const sendDataObservable = this.dataService.sendData(
          obj,
          'whoweareTimeline',
          element._id
        );
        if (sendDataObservable) {
          sendDataObservable.subscribe(
            (res: any) => {
              if (res.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: res.message,
                });
                this.reloadPage();
              } else {
                // Handle error response

                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.message,
                });
              }
            },
            (error: any) => {
              // Handle HTTP error
              console.error('Error:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'An error occurred while sending data.',
              });
            }
          );
        } else {
          console.error('sendDataObservable is undefined');
        }
      } else {
        console.error('Element or _id is missing:', element);
      }
    });
  }
  this.added = false;
}

// timeline header
getTimeLineHeader() {
  this.dataService.getData('whoWeAretimeLineHeader').subscribe((res: any) => {
    this.timeLineHeader = res.result;
    console.log(this.timeLineHeader)
    if (this.timeLineHeader) {
      this.timelineHeaderForm.patchValue({
        _id: this.timeLineHeader._id,
        title: this.timeLineHeader.title,
        titleAr: this.timeLineHeader.titleAr,
        paragraph: this.timeLineHeader.paragraph,
        paragraphAr: this.timeLineHeader.paragraphAr,
      })
    }
  })
}

initializeTimeLineHeaderForm() {
  this.timelineHeaderForm = this.fb.group({
    _id: [null, Validators.required],
    title: [null, Validators.required],
    titleAr: [null, Validators.required],
    paragraph: [null, Validators.required],
    paragraphAr: [null, Validators.required],
  })
}

onSubmitHeader(formName: string) {
  if(formName=="timelineHeaderForm"){
    if(this.timelineHeaderForm.value){
      let obj = {
        title: this.timelineHeaderForm.value.title,
        titleAr: this.timelineHeaderForm.value.titleAr,
        paragraph: this.timelineHeaderForm.value.paragraph,
        paragraphAr: this.timelineHeaderForm.value.paragraphAr,
      }
      if(this.timelineHeaderForm.value._id){
        this.dataService.sendData(obj,'whoWeAretimeLineHeader', this.timelineHeaderForm.value._id).subscribe((res:any)=>{
          if(res.success){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.reloadPage();
          }
        })
      } else {
        this.dataService.sendData(obj,'whoWeAretimeLineHeader').subscribe((res:any)=>{
          if(res.success){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.reloadPage();
          }
        })
      }
    }
  }

}
}
