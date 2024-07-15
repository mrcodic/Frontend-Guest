import { DataService } from './../../service/data.service';
import { Component, Injector } from '@angular/core';
import { CmsService } from '../../service/cms.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  filterForm: any = FormGroup;

  route: ActivatedRoute;
  blogs!: any[];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(
    private blogService: CmsService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    injector: Injector
  ) {
    this.route = injector.get(ActivatedRoute);
    this.filterForm = this.formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
    });
  }

  ngOnInit(): void {
    $('#datepicker').datepicker();
    $('#datepickerTo').datepicker();

    this.getblogs();
  }


  getblogs(): void {
    this.blogService.getAll(`landing/news`).subscribe((res) => {
      if (res.success) {
        this.blogs = res.result.posts;
        console.log(this.blogs);

      }
    });
  }
  getfilteredblogs(){
    let obj = {
      startDate:new Date(this.filterForm.value.dateFrom).toISOString().toString(),
      endDate:new Date(this.filterForm.value.dateTo).toISOString().toString()
    }

    this.dataService.sendData(obj,'filter-news').subscribe((res:any)=>{
      if (res.success) {
        this.blogs = res.result;
        console.log(this.blogs);
      }
    })

  }
  catchDate(){
    $('#datepickerFrom').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true
    }).on('changeDate', (e: any) => {
      // Update the form control value with the selected date
      this.filterForm.setValue({
        dateFrom: new Date(e.target.value)
      });
    });

    // Initialize datepicker for Date To input
    $('#datepickerTo').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true
    }).on('changeDate', (e: any) => {
      // Update the form control value with the selected date
      this.filterForm.setValue({
        dateTo:new Date( e.target.value)
      });
    });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
  }

getDisplayedBlogs(): any[] {
  // Check if this.blogs is defined and not null, and it's an array
const blogsArray = this.blogs || [];
  if (blogsArray && blogsArray.length > 0) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.blogs.length);
    return this.blogs.slice(startIndex, endIndex);
  } else {
    return []; // Return an empty array if this.blogs is undefined, null, not an array, or empty
  }
}

getPageNumbers(): number[] {
  // Check if this.blogs is defined and not null, and it's an array
  if (this.blogs && Array.isArray(this.blogs) && this.blogs.length > 0) {
    const pageCount = Math.ceil(this.blogs.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  } else {
    return [];
  }
}

  sanitizeHtml(html: string): SafeHtml {
    const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return safeHtml;
  }

}
