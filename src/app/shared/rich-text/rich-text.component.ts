import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrl: './rich-text.component.css',
})
export class RichTextComponent {
  @Output() changeInRichData = new EventEmitter<string>();
  @Input() richData: any = '';
  @Input() isDisabled!: boolean;

  config = {
    placeholder: '',
    tabsize: 4,
    height: 100,
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'strikethrough']],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['hr']],
    ],
  };

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.isDisabled) {
      this.config.toolbar = [];
    } else {
      this.config.toolbar = [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'strikethrough']],
        ['fontsize', ['fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['hr']],
      ];
    }
  }
  ngAfterViewInit() {
    this.modifyContentEditable();
  }

  modifyContentEditable() {
    const noteEditableElement = this.elementRef.nativeElement.querySelector(
      '.note-editable[contenteditable]'
    );
    if (noteEditableElement) {
      noteEditableElement.contentEditable = !this.isDisabled;
    }
  }
  richDataChanged() {
    this.changeInRichData.emit(this.richData);
  }
}
