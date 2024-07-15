import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Action } from '../../data-model/data-table.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  @Input() inputs: any[] = [];
  @Input() formControlFromParent!: FormGroup;
  @Input() action: string = Action.ADD;
  @Output() formSubmitted = new EventEmitter<FormGroup>();
  @Output() conditinalFunction = new EventEmitter<string>();

  isError: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  changeInRichData(textValue: string, formControlName: string) {
    this.formControlFromParent.controls[formControlName].setValue(textValue);
  }

  conditionalOnChange(functaon: any) {
    functaon(this.formControlFromParent, this.inputs);
  }

  Confirm() {
    if (this.formControlFromParent.invalid) {
      this.isError = true;
    } else if (this.formControlFromParent.valid) {
      this.formSubmitted.emit(this.formControlFromParent);
    }
  }
}
