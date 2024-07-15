export interface DataTableColumns {
  field: string;
  header: string;
  rowType: DataTableRowType;
  enumTdObj?: any;
  style?: any;
}
export enum DataTableRowType {
  NORMAL = 'normal',
  ENUM = 'enum',
  BOOLEAN = 'boolean',
  DATE = 'date',
  IMAGE = 'image',
  ICON = 'icon',
  LINK='link',
  DOWNLOAD='download'
}

export interface conditionalAction {
  isConditionalAction: boolean;
  icon: string;
  style: string;
  actionFunction: string;
  conditionalByRow?: { data: string; field: string };
}

export enum Action {
  DETAILS = 'details',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
}
