import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from '../../service/cms.service';
import { DataService } from '../../service/data.service';
declare function scriptMain(): void;
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  apiString!: string;
  header!: string;
  image!: string;
  boardmembers:any
  message:any
  constructor(
    private homeService: CmsService,
    private dataService: DataService,
    injector: Injector
  ) {
  }
  ngOnInit(): void {
    this.getallboardmembers();
    scriptMain();
  }
  getallboardmembers(){
    this.homeService
    .getAll(`landing/board`)
    .subscribe((res) => {
      if (res.success) {
        this.boardmembers = res.result?.members;
        this.header=res.result.header?.label;
        this.image=res.result.header?.image;
        this.message=res.result?.message;
      }
        });
  }
}
