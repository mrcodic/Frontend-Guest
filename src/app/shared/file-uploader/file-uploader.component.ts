import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  convertBlobToBase64,
} from '../HelperBase';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  @Input() changeFile: boolean = false;
  @Input() uploaded: boolean = false;
  @Input() multiple: boolean = false;
  @Output() fileUploaded = new EventEmitter<{
    imageBase64: string | null;
    fileName: string | null;
  }>();

  uploadBtn: { icon: string; label: string } = {
    icon: 'fa fa-plus',
    label: 'Upload Image',
  };

  constructor(private messageService: MessageService) {}

  ngOnChanges(): void {
    if (this.changeFile) {
      this.uploadBtn = {
        icon: 'fa fa-pencil',
        label: 'Update Image',
      };
    }
    if (this.uploaded) {
      this.uploadBtn = {
        icon: 'fa fa-check',
        label: 'Uploaded',
      };
    }
  }

  uploadFile(event: any) {
    if (event?.files && event.files.length > 0) {
      const files = event.files;
      let filesName: string[] = [];

      for (let index = 0; index < files.length; index++) {
        filesName.push(files[index].name);
        const blobUrl = URL.createObjectURL(files[index]);

        convertBlobToBase64(blobUrl)
          .then((base64String) => {
            const firstPartOfbase64String = base64String.split(',');
            const base64Data = base64String.replace(
              `${firstPartOfbase64String[0]},`,
              ''
            );

            this.fileUploaded.emit({ imageBase64: base64Data, fileName: files[index].name });

            this.uploadBtn = {
              icon: 'fa fa-check',
              label: 'Uploaded',
            };
          })
          .catch((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error,
              life: 3000,
            });

            this.uploadBtn = {
              icon: 'pi-times',
              label: 'Error',
            };
            this.fileUploaded.emit({ imageBase64: null, fileName: null });
          });
      }
    }
  }
}
