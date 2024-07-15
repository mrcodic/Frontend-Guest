import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { CrudService } from '../../../../service/crud.service';
import { MessageService } from 'primeng/api';
import { CMSBoard } from '../../../../data-model/cms.model';
import { ID, messageService } from '../../../../shared/ServicesBase';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertBlobToBase64 } from '../../../../shared/HelperBase';
import { DataService } from '../../../../service/data.service';

@Component({
  selector: 'app-cms-board-page',
  templateUrl: './cms-board-page.component.html',
  styleUrl: './cms-board-page.component.scss',
})
export class CmsBoardPageComponent implements OnInit {
  pageTitle: string = 'Board';
  board!:any
  boardForm!: FormGroup;
  memberAdded: boolean = false;
  disableButton: boolean = false;

  isMoving = false;
  reorderedMembers: any[] = [];

  constructor(private fb: FormBuilder, private messageService: MessageService,private dataService:DataService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.dataService.getData('board').subscribe((res: any) => {
      this.board = res.result;
      console.log( this.board);

      if(this.board){
       if (this.board.members) {
        this.board.members.map((member: any) => {
          const memberForm = this.fb.group({
            _id: [member._id, Validators.required],
            name: [member.name, Validators.required],
            nameAr: [member.nameAr, Validators.required],
            role: [member.role, Validators.required],
            roleAr: [member.roleAr, Validators.required],
            images: [member.images, Validators.required],
            order:[member.order]
          })
          this.members.push(memberForm);
        })
       }
        console.log(res.result._id)
        this.boardForm.patchValue({
          headerId: res.result._id,
          headerLabel: res.result.header.label,
          headerLabelAr: res.result.header.labelAr,
          headerImage: res.result.header.image,
          messageName: res.result.message.name,
          messageNameAr: res.result.message.nameAr,
          messageContent: res.result.message.content,
          messageContentAr: res.result.message.contentAr,
          messageImage: res.result.message.image,
        })

      }

    })
  }

  initializeForm(): void {
    this.boardForm = this.fb.group({
      headerId: [null, Validators.required],
      headerLabel: [null, Validators.required],
      headerLabelAr: [null, Validators.required],
      headerImage: ['', Validators.required],
      messageName: [null, Validators.required],
      messageNameAr: [null, Validators.required],
      messageContent: [null, Validators.required],
      messageContentAr: [null, Validators.required],
      messageImage: ['', Validators.required],
      members: this.fb.array([])
    });
  }
  get members(): FormArray {
    return this.boardForm.controls['members'] as FormArray;
  }



  addMember() {
    const memberForm = this.fb.group({
      _id: [null, Validators.required],
      name: [null, Validators.required],
      nameAr: [null, Validators.required],
      role: [null, Validators.required],
      roleAr: [null, Validators.required],
      images: [[], Validators.required],
      order: [this.members.length + 1] // Set order as the last one
    });
    this.members.push(memberForm);
    this.memberAdded = true; // Set the flag to true when a member is added
  }
  removeMember(i: number) {
    this.members.removeAt(i);
    this.updatereorderedMembers();
  }

  // onFileChange(event: Event, index?: number) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement && inputElement.files && inputElement.files.length > 0 && index === undefined) {
  //     const files = Array.from(inputElement.files); // Convert FileList to array
  //     let base64Value: string | string[] = '';
  //     const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
  //     const formControl = this.boardForm.get(controlName);
  //     if (files.length === 1) {
  //       const file = files[0];
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         const base64String = reader.result as string;
  //         base64Value = base64String.substring('data:image/jpeg;base64,'.length);

  //         if (formControl) {
  //           formControl.setValue(base64Value);
  //         } else {
  //           console.error(`FormControl '${controlName}' not found`);
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     } else {
  //       const base64Array: { images: string }[] = [];

  //       files.forEach((file: File) => {
  //         const reader = new FileReader();

  //         reader.onload = () => {
  //           const base64String = reader.result as string;
  //           base64Value = base64String.substring('data:image/jpeg;base64,'.length);

  //           base64Array.push({ "images": base64Value });


  //         };

  //         reader.readAsDataURL(file);
  //       });
  //       if (formControl) {
  //         formControl.patchValue(base64Array);
  //       } else {
  //         console.error(`FormControl '${controlName}' not found`);
  //       }
  //     }
  // }else if(inputElement && inputElement.files && inputElement.files.length > 0 &&index !== undefined &&index >=0 ){
  //   if(inputElement && inputElement.files &&inputElement.files.length>2){
  //     this.messageService.add({severity:'error', summary: 'Error', detail: 'You can only upload up to 2 images'});
  //     inputElement.files = null;
  //     this.disableButton = true;
  //   }else if(inputElement && inputElement.files &&inputElement.files.length ==2){
  //     let files = Array.from(inputElement.files)
  //     let base64Value: string = '';
  //       let base64Array: { image: string }[] = [];
  //       const formArray = this.members.at(index) as FormArray; // Assuming this.members is a FormArray
  //       const control = formArray.get('images');
  //       files.forEach((file: File) => {
  //         const reader = new FileReader();

  //         reader.onload = () => {
  //           const base64String = reader.result as string;
  //           base64Value = base64String.substring('data:image/jpeg;base64,'.length);
  //           base64Array.push({ image: base64Value });
  //         };

  //         reader.readAsDataURL(file);
  //       });
  //       control?.setValue(base64Array);
  //       this.disableButton = false;
  //   }else{
  //     this.messageService.add({severity:'error', summary: 'Error', detail: 'You must upload at least 2 image'});
  //     inputElement.files = null;
  //     this.disableButton = true;
  //   }
  //   }

  // }

  onFileChange(event: Event, index?: number) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const files = Array.from(inputElement.files); // Convert FileList to array
  
      // Handle case when index is not provided (single file upload)
      if (index === undefined) {
        this.handleSingleFileUpload(files, inputElement);
      } else {
        this.handleMultipleFileUpload(files, index);
      }
    }
  }
  
  handleSingleFileUpload(files: File[], inputElement: HTMLInputElement) {
    const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
    const formControl = this.boardForm.get(controlName);
  
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Value = base64String.split(',')[1]; // Removing the data URL prefix
  
        if (formControl) {
          formControl.setValue(base64Value);
        } else {
          console.error(`FormControl '${controlName}' not found`);
        }
      };
  
      reader.readAsDataURL(file);
    } else {
      const base64Array: { images: string }[] = [];
  
      files.forEach((file: File) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = reader.result as string;
          const base64Value = base64String.split(',')[1]; // Removing the data URL prefix
  
          base64Array.push({ images: base64Value });
  
          if (formControl) {
            formControl.patchValue(base64Array);
          } else {
            console.error(`FormControl '${controlName}' not found`);
          }
        };
  
        reader.readAsDataURL(file);
      });
    }
  }
  
  handleMultipleFileUpload(files: File[], index: number) {
    if (files.length > 2) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You can only upload up to 2 images' });
      this.disableButton = true;
    } else if (files.length === 2) {
      let base64Array: { image: string }[] = [];
      const formArray = this.members.at(index) as FormArray; // Assuming this.members is a FormArray
      const control = formArray.get('images');
  
      files.forEach((file: File) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = reader.result as string;
          const base64Value = base64String.split(',')[1]; // Removing the data URL prefix
  
          base64Array.push({ image: base64Value });
  
          if (control) {
            control.setValue(base64Array);
          } else {
            console.error(`FormControl 'images' not found in form array`);
          }
        };
  
        reader.readAsDataURL(file);
      });
  
      this.disableButton = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You must upload at least 2 images' });
      this.disableButton = true;
    }
  }
  


  onSubmit(): void {
    // debugger
    if (this.boardForm.value && !this.memberAdded) { // Check if a member is added before submitting
      let obj: any = {
        header: {
          label: this.boardForm.value.headerLabel,
          labelAr: this.boardForm.value.headerLabelAr,
          image: this.boardForm.value.headerImage
        },
        message: {
          name: this.boardForm.value.messageName,
          nameAr: this.boardForm.value.messageNameAr,
          content: this.boardForm.value.messageContent,
          contentAr: this.boardForm.value.messageContentAr,
          image: this.boardForm.value.messageImage
        },
        members: this.boardForm.value.members
      };

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

      this.dataService.sendData(obj, 'board', this.boardForm.value.headerId).subscribe((res: any) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.reloadPage();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create board' });
        }
      });
    }
    this.memberAdded = false; // Reset the flag after form submission
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

moveUp(index: number) {
  if (index > 0) {
    this.isMoving = true;
      const formArray = this.members;
      const item = formArray.at(index);
      formArray.removeAt(index);
      formArray.insert(index - 1, item);
      setTimeout(
        () => {
          this.isMoving = false;
          this.updatereorderedMembers();
        }
        , 300);
      console.log(item.value)
  }
}

moveDown(index: number) {
  const formArray = this.members;
  if (index < formArray.length - 1) {
    this.isMoving = true;
      const item = formArray.at(index);
      formArray.removeAt(index);
      formArray.insert(index + 1, item);
      setTimeout(() => 
        {
          this.isMoving = false;
          this.updatereorderedMembers();
        } 
      , 300);
      console.log(item.value)
  }
}

getTransform(index: number): string {
  return `translateY(${index * 5}%)`;
}

updatereorderedMembers() {
  this.reorderedMembers = this.members.controls.map((control, index) => {
    const value = control.value;
    value.order = index + 1; // Update the order property
    return value;
  });
  console.log(this.reorderedMembers);
}
}
