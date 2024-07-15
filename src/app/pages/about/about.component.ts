import { DataService } from './../../service/data.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CmsService } from '../../service/cms.service';
import { ActivatedRoute } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

declare function scriptMain(): void;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent | undefined;

  images:any
  whoweare!:any
  aboutus:any
  aboutusimgTwo:any
  aboutusimgOne:any
  route: ActivatedRoute;
  timeline: any[] = [];
  slideConfig = {
    vertical: true,
    verticalSwiping: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: false,
    nextArrow: false
  };

  currentSlideIndex = 0; // Track the current slide index

  timelineHeader?: any;
  timeLineTitle: string = '';
  timeLineParagraph: string = '';

  constructor(
    private homeService: CmsService,
    private dataService: DataService,
    injector: Injector
  ) {
    this.route = injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    scriptMain();
    this.getwhoweare();
  }

  getwhoweare(): void {
    this.homeService.getAll(`landing/whoweare`).subscribe((res) => {
      if (res.success) {
        this.whoweare = res.result;
        this.timeline = this.whoweare?.timeline || [];
        this.timelineHeader = res.result.timeLineHeader;
        this.timeLineTitle = this.timelineHeader.title;
        this.timeLineParagraph = this.timelineHeader.paragraph;
      }
    });
  }

  trackByImage(index: number, item: any): string {
    return item.image;
  }

  goToSlide(index: number): void {
    if (this.slickModal) {
      this.slickModal.slickGoTo(index);
      this.currentSlideIndex = index; // Update the current slide index
    }
  }

  nextSlide(): void {
    if (this.slickModal && this.currentSlideIndex < this.timeline.length - 1) {
      this.slickModal.slickNext();
      this.currentSlideIndex++;
    }
  }

  prevSlide(): void {
    if (this.slickModal && this.currentSlideIndex > 0) {
      this.slickModal.slickPrev();
      this.currentSlideIndex--;
    }
  }
}
