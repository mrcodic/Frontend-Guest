import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import {
  DataTableColumns,
  DataTableRowType,
  conditionalAction,
} from '../../data-model/data-table.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() cols: DataTableColumns[] = [];
  @Input() data: {}[] = [];
  @Input() isActions: boolean = false;
  @Input() isMainActions: boolean = true;
  @Input() conditionalAction: conditionalAction[] = [
    {
      actionFunction: '',
      icon: 'pi',
      isConditionalAction: false,
      style: 'p-button-rounded',
    },
  ];
  @Output() actionClicked = new EventEmitter<{ action: string; id: string }>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  dataTableRowType = DataTableRowType;
  selectedRows: [] = [];
  selectedIds: any = [];
  constructor() {}

  ngOnInit(): void {}

  actionBtnClicked(action: string, id: any) {
    this.actionClicked.emit({ action, id });
  }

  clear(table: Table) {
    this.searchInput.nativeElement.value = '';
    table.clear();
  }
  deleteMultiple() {
    this.selectedIds = [];
    this.selectedRows.map((row: any) => this.selectedIds.push(row._id));
    if (this.selectedIds.length > 0) {
      this.actionBtnClicked('deleteMultiple', this.selectedIds);
    }
  }
}
