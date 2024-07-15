import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { delay, map, switchMap } from 'rxjs';
import { LoadingService } from '../../service/loading.service';
@Component({
    selector: 'app-news',
    templateUrl: './single-news.component.html',
    styleUrl: './single-news.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class SingleNewsComponent {
  id?:any;
  news?:any
  tagsApi?:any
  tags?:any = [];
  loading:boolean = false
  relatedPosts?:any
  constructor(private route: ActivatedRoute,private dataService:DataService, private sanitizer: DomSanitizer,
    private router:Router,    private _loading: LoadingService

  ) {}
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: any) => {
        // Subscribe to changes in the 'id' parameter
        this.news=[]
        this.listenToLoading();
        return params.get('id');
      })
    ).subscribe((id: any) => {
      // Update the 'id' property with the new value
      this.id = id;
      // Perform any further actions with the updated 'id' value
      this.dataService.getData('news',this.id).subscribe((res:any)=>{
        if (res.success) {
          this.news = res.result;
          if (this.news.relatedPosts.length > 0 && this.news.relatedPosts.length > 2) {
            this.relatedPosts = res.result.relatedPosts.slice(0, 3)
          }else if (this.news.relatedPosts.length <3 && this.news.relatedPosts.length > 0) {
            this.relatedPosts = res.result.relatedPosts
          }
        }
    })
    });
    this.dataService.getData('news',this.id).subscribe((res:any)=>{
        if (res.success) {
          this.news = res.result;
          if (this.news.relatedPosts.length > 0 && this.news.relatedPosts.length > 2) {
            this.relatedPosts = res.result.relatedPosts.slice(0, 3)
          }else if (this.news.relatedPosts.length <3 && this.news.relatedPosts.length > 0) {
            this.relatedPosts = res.result.relatedPosts
          }
        }
    })

  }
  sanitizeHtml(html: string): SafeHtml {
    const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return safeHtml;
  }
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
