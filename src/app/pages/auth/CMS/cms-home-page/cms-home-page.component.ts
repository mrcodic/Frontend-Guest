import { Component, OnInit } from '@angular/core';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CMSHome } from '../../../../data-model/cms.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataService } from '../../../../service/data.service';

@Component({
  selector: 'app-cms-home-page',
  templateUrl: './cms-home-page.component.html',
  styleUrl: './cms-home-page.component.scss',
})
export class CmsHomePageComponent implements OnInit {
  pageTitle: string = 'Home';
  added: boolean = false;

  header!: any;
  timeline!: any;
  industries!: any;
  partners!: any;
  statistics!: any;
  headerForm!: FormGroup;
  timelineForm!: FormGroup;
  industriesForm!: FormGroup;
  partnersForm!: FormGroup;
  statisticsForm!: FormGroup;
  messagesForm!: FormGroup;
  messages!: any;
  messagesFrom: any;

  // about us
  aboutUs!: any;
  aboutUsForm!: FormGroup;

  isImage: boolean = false;
  isVideo: boolean = false;
  types: any[] = [
    { label: 'Image', value: 'image' },
    { label: 'Video', value: 'video' }
  ];
  selectedType: any;

  // timeline header
  timelineHeaderForm!: FormGroup;
  timeLineHeader! : any;

  isMoving = false;
  reorderedPartners: any[] = [];

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.initializeHeaderForm();
    this.initializeTimelineForm();
    this.initializeIndustriesForm();
    this.initializePartnersForm();
    this.initializeStatisticsForm();
    this.initializeMessagesForm();
    this.initializeAboutUsForm();

    this.initializeTimeLineHeaderForm();
  }

  ngOnInit(): void {
    this.dataService.getData('homeHeader').subscribe((res: any) => {
      this.header = res.result;
      if (this.header) {
        this.headerForm.setControl('headerFromArray', this.fb.array([]));
        this.header.forEach((element: any) => {
          // console.log(element)
          const header = this.fb.group({
            _id: [element._id, Validators.required],
            label: [element.label, Validators.required],
            labelAr: [element.labelAr, Validators.required],
            type: [''],
            isImage: [element.image !== null],
            isVideo: [element.video !== null],
            image: [element.image],
            video: [element.video]
          });
          (this.headerForm.get('headerFromArray') as FormArray).push(header);
        });
      }
    });
    this.dataService.getData('homeAboutUS').subscribe((res: any) => {
      const aboutUs = res.result;
      if (aboutUs) {
        this.aboutUsForm.patchValue({
          _id: aboutUs._id,
          title: aboutUs.title,
          content: aboutUs.content,
          contentAr: aboutUs.contentAr,
        });

        this.setImages(aboutUs.images);
      }
    });
    this.dataService.getData('homeTimeline').subscribe((res: any) => {
      this.timeline = res.result;
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

    this.dataService.getData('homeIndustry').subscribe((res: any) => {
      this.industries = res.result;
      if (this.industries) {
        // debugger
        this.industriesForm.setControl(
          'industriesFormArray',
          this.fb.array([])
        );
        this.industries.forEach((element: any) => {
          const industries = this.fb.group({
            _id: [element._id, Validators.required],
            link: [element.link, Validators.required],
            label: [element.label, Validators.required],
            labelAr: [element.labelAr, Validators.required],
            image: [element.image, Validators.required],
          });
          (this.industriesForm.get('industriesFormArray') as FormArray).push(
            industries
          );
        });
      }
    });

    this.dataService.getData('homePartner').subscribe((res: any) => {
      this.partners = res.result;
      if (this.partners) {
        console.log(this.partners);
        this.partnersForm.setControl('partnersFormArray', this.fb.array([]));
        this.partners.forEach((element: any) => {
          const partners = this.fb.group({
            _id: [element._id, Validators.required],
            image: [element.image, Validators.required],
            order: [element.order]
          });

          (this.partnersForm.get('partnersFormArray') as FormArray).push(
            partners
          );
        });
      }
    });

    this.dataService.getData('homeStatistics').subscribe((res: any) => {
      this.statistics = res.result;
      if (this.statistics) {
        console.log(this.statistics);
        this.statisticsForm.setControl(
          'statisticsFormArray',
          this.fb.array([])
        );
        this.statistics.forEach((element: any) => {
          const statistics = this.fb.group({
            _id: [element._id, Validators.required],
            label: [element.label, Validators.required],
            labelAr: [element.labelAr, Validators.required],
            value: [element.value, Validators.required],
            valueAr: [element.valueAr, Validators.required],
            image: [element.image, Validators.required],
          });
          (this.statisticsForm.get('statisticsFormArray') as FormArray).push(
            statistics
          );
        });
      }
    });

    this.dataService.getData('homeMessages').subscribe((res: any) => {
      this.messages = res.result;
      if (this.messages) {
        console.log(this.messages.image);
        this.messagesForm.patchValue({
          _id: this.messages._id,
          name: this.messages.name,
          nameAr: this.messages.nameAr,
          content: this.messages.content,
          contentAr: this.messages.contentAr,
          image: this.messages.image,
        });
      }
    });

    this.getTimeLineHeader();
  }

  get imageControls() {
    return this.aboutUsForm.get('images') as FormArray;
  }

  get getHeaderFrom() {
    return this.headerForm.get('headerFromArray') as FormArray;
  }
  get getAboutUsFrom() {
    return this.aboutUsForm.get('homeAboutUS') as FormArray;
  }
  get getTimelineFrom() {
    return this.timelineForm.get('timelineFromArray') as FormArray;
  }
  get getIndustriesFrom() {
    return this.industriesForm.get('industriesFormArray') as FormArray;
  }
  get getPartnersForm() {
    return this.partnersForm.get('partnersFormArray') as FormArray;
  }
  get getStatisticsForm() {
    return this.statisticsForm.get('statisticsFormArray') as FormArray;
  }
  get getMessagesForm() {
    return this.messagesForm.get('image') as FormControl;
  }
  addForm(formName: string, event: Event) {
    event.preventDefault();
    if (formName == 'headerForm') {
      this.getHeaderFrom?.push(
        this.fb.group({
          _id: [null, Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          type: [''],
          isImage: [false],
          isVideo: [false],
          image: [null, Validators.required],
          video: [null, Validators.required]
        })
      );
      this.added = true;
    }
    else if (formName == 'aboutUsForm') {
      this.getAboutUsFrom?.push(
        this.fb.group({
          _id: [null, Validators.required],
          content: [null, Validators.required],
          contentAr: [null, Validators.required],
          title: [null, Validators.required],
          image: ['', Validators.required],
        })
      );
      this.added = true;
    }
    else if (formName == 'timelineForm') {
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
    } else if (formName == 'industriesForm') {
      this.getIndustriesFrom?.push(
        this.fb.group({
          _id: [null, Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          link: [null, Validators.required],
          image: ['', Validators.required],
        })
      );
      this.added = true;
    } else if (formName == 'partnersForm') {
      this.getPartnersForm?.push(
        this.fb.group({
          _id: [null, Validators.required],
          image: ['', Validators.required],
          order: [this.getPartnersForm.length + 1] // Set order as the last one
        })
      );
      this.added = true;
    } else if (formName == 'statisticsForm') {
      this.getStatisticsForm?.push(
        this.fb.group({
          _id: [null, Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          value: [null, Validators.required],
          valueAr: [null, Validators.required],
          image: ['', Validators.required],
        })
      );
      this.added = true;
    }
  }
  removeForm(index: number, formName: string, event: Event) {
    event.preventDefault();
    if (formName == 'headerForm') {
      this.added = true;

      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId = this.getHeaderFrom.at(index).get('_id')?.value;
          if (itemId) {
            this.dataService
              .deleteData('homeHeader', itemId)
              .subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.getHeaderFrom.removeAt(index);
                }
              });
          }
          this.getHeaderFrom.removeAt(index);
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
    else if (formName == 'aboutUsForm') {
      this.added = true;

      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId = this.getAboutUsFrom.at(index).get('_id')?.value;
          if (itemId) {
            this.dataService
              .deleteData('homeAboutUs', itemId)
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
          this.getAboutUsFrom.removeAt(index);
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
    else if (formName == 'timelineForm') {
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
    } else if (formName == 'industriesForm') {
      this.added = true;

      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId = this.getIndustriesFrom.at(index).get('_id')?.value;
          if (itemId) {
            this.dataService
              .deleteData('homeIndustries', itemId)
              .subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.getIndustriesFrom.removeAt(index);
                }
              });
          }
          this.getIndustriesFrom.removeAt(index);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
          });
        },
      });
    } else if (formName == 'partnersForm') {
      this.added = true;
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId = this.getPartnersForm.at(index).get('_id')?.value;
          if (itemId) {
            this.dataService
              .deleteData('homePartner', itemId)
              .subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.getPartnersForm.removeAt(index);
                  this.updateReorderedPartners();
                }
              });
          }
          this.getPartnersForm.removeAt(index);
          this.updateReorderedPartners();
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
          });
        },
      });
    } else if (formName == 'statisticsForm') {
      this.added = true;

      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId = this.getStatisticsForm.at(index).get('_id')?.value;
          if (itemId) {
            this.dataService
              .deleteData('homeStatistics', itemId)
              .subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.getStatisticsForm.removeAt(index);
                }
              });
          }
          this.getStatisticsForm.removeAt(index);
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
 // Handle file changes
onImageChange(event: any) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement && inputElement.files && inputElement.files.length > 0) {
    const files = Array.from(inputElement.files);

    // Clear previous images in FormArray
    this.imageControls.clear();

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Value = base64String.split(',')[1]; // Removing the data URL prefix

        // Push new image to FormArray
        this.imageControls.push(this.fb.group({
          _id: [null], // Set to null or handle accordingly if needed
          image: [base64Value] // Store base64 image data
        }));
      };

      reader.readAsDataURL(file);
    });
  }
}

onFileChange(event: Event, index?: number, formName?: string) {
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
        } else if (fileType.startsWith('video/')) {
          this.updateFormWithBase64(formName, index, 'video', base64Value);
        } else {
          // Handle unsupported file types
          console.error('Unsupported file type');
        }
      };
      reader.readAsDataURL(file);
    }
}

  // Update the form with the base64 value
  updateFormWithBase64(formName: string | undefined, index: number | undefined, field: string, base64Value: string) {
    if (formName === 'aboutUsForm' && index !== undefined) {
      const imagesArray = this.imageControls;
      imagesArray.at(index).patchValue({ [field]: base64Value });
    } else if (formName === 'headerForm') {
      this.getHeaderFrom?.at(index as number).patchValue({ [field]: base64Value });
    } else if (formName === 'timelineForm') {
      this.getTimelineFrom?.at(index as number).patchValue({ [field]: base64Value });
    } else if (formName === 'industriesForm') {
      this.getIndustriesFrom?.at(index as number).patchValue({ [field]: base64Value });
    } else if (formName === 'partnersForm') {
      this.getPartnersForm?.at(index as number).patchValue({ [field]: base64Value });
    } else if (formName === 'statisticsForm') {
      this.getStatisticsForm?.at(index as number).patchValue({ [field]: base64Value });
    } else if (formName === 'messagesForm') {
      this.getMessagesForm.setValue(base64Value);
    }
  }



  initializeHeaderForm() {
    this.headerForm = this.fb.group({
      headerFromArray: this.fb.array([
        this.fb.group({
          _id: [null, Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          // image: ['', Validators.required],
          // video: ['', Validators.required],
          type: [''],
          isImage: [false],
          isVideo: [false],
          image: [null, Validators.required],
          video: [null, Validators.required]
        }),
      ]),
    });
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

  initializeIndustriesForm() {
    this.industriesForm = this.fb.group({
      industriesFormArray: this.fb.array([
        this.fb.group({
          _id: [null, Validators.required],
          image: ['', Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          link: [null, Validators.required],
        }),
      ]),
    });
  }

  initializePartnersForm() {
    this.partnersForm = this.fb.group({
      partnersFormArray: this.fb.array([
        this.fb.group({
          _id: [null, Validators.required],
          image: ['', Validators.required],
          order:['']
        }),
      ]),
    });
  }

  initializeMessagesForm() {
    this.messagesForm = this.fb.group({
      _id: [null, Validators.required],
      image: ['', Validators.required],
      name: [null, Validators.required],
      nameAr: [null, Validators.required],
      content: [null, Validators.required],
      contentAr: [null, Validators.required],
    });
  }

  // initialize about us form
  initializeAboutUsForm() {
    this.aboutUsForm = this.fb.group({
      _id: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required],
      contentAr: [null, Validators.required],
      images: this.fb.array([]) // Initialize the FormArray for images
    });
  }

  // Set images FormArray
  setImages(images: any[]) {
    const imageArray = images.map(image => this.fb.group({
      _id: [image._id], // Add the existing _id of the image
      image: [image.image]
    }));

    const imageFormArray = this.fb.array(imageArray);
    this.aboutUsForm.setControl('images', imageFormArray);
  }

  initializeStatisticsForm() {
    this.statisticsForm = this.fb.group({
      statisticsFormArray: this.fb.array([
        this.fb.group({
          _id: [null, Validators.required],
          label: [null, Validators.required],
          labelAr: [null, Validators.required],
          value: [null, Validators.required],
          valueAr: [null, Validators.required],
          image: ['', Validators.required],
        }),
      ]),
    });
  }

  onSubmit(formName: string) {
    if (formName === 'headerForm' && !this.added) {
      this.header = this.headerForm.value;
      console.log(this.header.value);

      this.header.headerFromArray.forEach((element: any) => {
        if (element) {
          // debugger
          const obj = {
            // image:
            //   element.image.startsWith('http') ||
            //   element.image.startsWith('https')
            //     ? null
            //     : element.image,
            // video:
            //   element.video.startsWith('http') ||
            //   element.video.startsWith('https')
            //     ? null
            //     : element.video,
            image: element.image && !element.image.startsWith('http') && !element.image.startsWith('https')
                        ? element.image
                        : null,
                    video: element.video && !element.video.startsWith('http') && !element.video.startsWith('https')
                        ? element.video
                        : null,
            label: element.label,
            labelAr: element.labelAr,
          };
          const sendDataObservable = this.dataService.sendData(
            obj,
            'homeHeader',
            element._id ? element._id : null
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
    else if (formName == 'aboutUsForm' && !this.added) {
      const aboutUsData = this.aboutUsForm.value;

      // Prepare the images for submission
      const images = aboutUsData.images.map((img: any) => ({
        _id: img._id, // Include the _id if it exists
        image: img.image
      }));

      const obj = {
        _id: aboutUsData._id,
        title: aboutUsData.title,
        content: aboutUsData.content,
        contentAr: aboutUsData.contentAr,
        images: images
      };
      this.dataService.sendData(obj, 'homeAboutUS', aboutUsData._id).subscribe((res: any) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message
          });
          this.reloadPage();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message
          });
        }
      });
    }
    else if (formName == 'timelineForm' && !this.added) {
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
          console.log(obj);
          const sendDataObservable = this.dataService.sendData(
            obj,
            'homeTimeline',
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
    } else if (formName == 'industriesForm' && !this.added) {
      this.industries = this.industriesForm.value;
      this.industries.industriesFormArray.forEach((element: any) => {
        if (element) {
          const obj = {
            image:
              element.image.startsWith('http') ||
              element.image.startsWith('https')
                ? null
                : element.image,
            label: element.label,
            labelAr: element.labelAr,
            link: element.link,
          };
          const sendDataObservable = this.dataService.sendData(
            obj,
            'homeIndustry',
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
    } else if (formName == 'partnersForm') {
      this.partners = this.partnersForm.value;
      this.partners.partnersFormArray.forEach((element: any) => {
        if (element) {
          const obj = {
            image:
              element.image.startsWith('http') ||
              element.image.startsWith('https')
                ? null
                : element.image,
            label: element.label,
            labelAr: element.labelAr,
            order: element.order // Include the order in the data being sent
          };
          const sendDataObservable = this.dataService.sendData(
            obj,
            'homePartner',
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
                  this.reloadPage();
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
          }
        }
      });
    } else if (formName == 'statisticsForm' && !this.added) {
      this.statistics = this.statisticsForm.value;
      this.statistics.statisticsFormArray.forEach((element: any) => {
        if (element) {
          const obj = {
            // image:
            //   element.image.startsWith('http') ||
            //   element.image.startsWith('https')
            //     ? null
            //     : element.image,
            image: element.image && !element.image.startsWith('http') && !element.image.startsWith('https')
                    ? element.image
                    : null,
            video: element.video && !element.video.startsWith('http') && !element.video.startsWith('https')
                    ? element.video
                    : null,
            label: element.label,
            labelAr: element.labelAr,
            value: element.value,
            valueAr: element.valueAr,
          };
          console.log(obj,element._id)
          const sendDataObservable = this.dataService.sendData(
            obj,
            'homeStatistics',
            element._id
          );
          if (sendDataObservable) {
            sendDataObservable.subscribe(
              (res: any) => {
                if (res.success) {
                  this.reloadPage();
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                } else {
                  // Handle error response

                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.message,
                  });
                  this.reloadPage();
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
          }
        }
      });
    } else if (formName == 'messagesForm' && !this.added) {
      this.messages = this.messagesForm.value;
      console.log(this.messagesForm.value);

      const obj = {
        name: this.messagesForm.value.name,
        nameAr: this.messagesForm.value.nameAr,
        content: this.messagesForm.value.content,
        contentAr: this.messagesForm.value.contentAr,
        image:
          this.messagesForm.value.image.startsWith('http') ||
          this.messagesForm.value.image.startsWith('https')
            ? null
            : this.messagesForm.value.image,
      };
      this.dataService
        .sendData(obj, 'adminMessages', this.messagesForm.value._id)
        .subscribe((res: any) => {
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
        });
    }
    this.added = false;
  }

  reloadPage() {
    window.location.reload();
  }


onTypeChange(event: any, index: number) {
  const selectedType = event.value;
  const formGroup = this.getHeaderFrom.at(index) as FormGroup;
  formGroup.patchValue({
    type: selectedType,
    isImage: selectedType === 'image',
    isVideo: selectedType === 'video'
  });
}

onFileIChange(event: Event, index: number, formName: string) {
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
      if (fileType && fileType.startsWith('image/')) {
        this.updateFormIWithBase64(index, 'image', base64Value);
      } else if (fileType && fileType.startsWith('video/')) {
        this.updateFormIWithBase64(index, 'video', base64Value);
      } else {
        // Handle unsupported file types
        console.error('Unsupported file type');
      }
    };
    reader.readAsDataURL(file);
  }
}

updateFormIWithBase64(index: number, controlName: string, base64Value: string) {
  const formGroup = this.getHeaderFrom.at(index) as FormGroup;
  const oppositeControlName = controlName === 'image' ? 'video' : 'image';
  formGroup.patchValue({
    [controlName]: base64Value,
    [oppositeControlName]: null
  });
}

// timeline header

getTimeLineHeader() {
  this.dataService.getData('timeLineHeader').subscribe((res: any) => {
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
        this.dataService.sendData(obj,'timeLineHeader', this.timelineHeaderForm.value._id).subscribe((res:any)=>{
          if(res.success){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.reloadPage();
          }
        })
      } else {
        this.dataService.sendData(obj,'timeLineHeader').subscribe((res:any)=>{
          if(res.success){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.reloadPage();
          }
        })
      }
    }
  }

}

moveUp(index: number) {
  if (index > 0) {
    this.isMoving = true;
      const formArray = this.getPartnersForm;
      const item = formArray.at(index);
      formArray.removeAt(index);
      formArray.insert(index - 1, item);
      setTimeout(
        () => {
          this.isMoving = false;
          this.updateReorderedPartners();
        }
        , 300);
      console.log(item.value)
  }
}

moveDown(index: number) {
  const formArray = this.getPartnersForm;
  if (index < formArray.length - 1) {
    this.isMoving = true;
      const item = formArray.at(index);
      formArray.removeAt(index);
      formArray.insert(index + 1, item);
      setTimeout(() =>
        {
          this.isMoving = false;
          this.updateReorderedPartners();
        }
      , 300);
      console.log(item.value)
  }
}

getTransform(index: number): string {
  return `translateY(${index * 5}%)`;
}

updateReorderedPartners() {
  this.reorderedPartners = this.getPartnersForm.controls.map((control, index) => {
    const value = control.value;
    value.order = index + 1; // Update the order property
    return value;
  });
  console.log(this.reorderedPartners);
}
}
