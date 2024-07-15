import { Action } from './data-table.model';

export interface FormInputs {
  placeholder: string;
  formControlName: string;
  type: string;
  id: string;
  errorMessage: string;
  element: formInputsElement;
  dropdownOpt?: DropDownOpt;
  textareaOpt?: TextareaOpt;
  conditionalAction?: Action;
  conditinalFunction?: any;
  isSwitchLabel?: boolean;
  switchLabel?: { true: string; false: string };
}
export interface DropDownOpt {
  options: {}[];
  optionLabel?: string;
  optionValue?: string;
}
export interface TextareaOpt {
  cols: number;
  rows: number;
}
export enum formInputsElement {
  INPUT = 'input',
  DROPDOWM = 'dropdown',
  MULTISELECT = 'multiSelect',
  TEXTEDITOR = 'textEditor',
  TEXTAREA = 'textarea',
  CALENDAR = 'calendar',
  SWITCH = 'switch',
}
