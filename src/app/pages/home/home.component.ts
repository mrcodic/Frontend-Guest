import { DataService } from './../../service/data.service';
import { Component, Injector, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from '../../service/cms.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

declare function scriptMain(): void;
declare function logoScript(): void;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, AfterViewChecked {

  route: ActivatedRoute;
  home!: any;
  statistics!: any;
  industries!: any;
  partners!: any;
  header!: string;
  image!: string;
  boardmembers: any;
  message!: any;
  aboutus: any;
  aboutusimgTwo: any;
  aboutusimgOne: any;
  blogs: any;
  isCarouselInitialized = false;

  constructor(
    private homeService: CmsService,
    injector: Injector,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    this.route = injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    scriptMain();
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });
    this.getHome();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (this.partners && this.partners.length && !this.isCarouselInitialized) {
      this.initializeCarousel();
      this.isCarouselInitialized = true;
    }
  }

  getHome(): void {
    this.dataService.getData('home').pipe(
      tap((res: any) => {
        if (res.success) {
          this.home = res.result;
          this.statistics = res.result.statistics;
          this.industries = res.result.industries;
          // this.partners = res.result.partners;
          this.boardmembers = res.result?.members || [];
          this.header = res.result.header?.label;
          this.image = res.result.header?.image;
          this.message = res.result?.message[0];
          this.blogs = res.result?.posts || [];
          this.aboutus = res.result.whoweare;
          this.aboutusimgOne = res.result.whoweare.images[0];
          this.aboutusimgTwo = res.result.whoweare.images[1];
        }
      })
    ).subscribe();

    this.getPartners();
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  navigateIndustries(link: string) {
    window.open(link, '_blank');
  }

  private initializeCarousel() {
    setTimeout(() => {
      logoScript();
    }, 0); // Adding a delay to ensure DOM updates are completed
  }

  getPartners() {
    this.dataService.getData('partners').subscribe((res: { result: any; }) => {
      this.partners = res.result;
    })
  }
}
