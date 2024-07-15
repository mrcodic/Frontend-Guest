import {
  Component,
  Injector,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { CmsService } from '../../service/cms.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent | undefined;

  timeline?: any;
  timelineHeader?: any;

  timeLineTitle: string = '';
  timeLineParagraph: string = '';

  constructor(
    private timelineService: CmsService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    injector: Injector
  ) {
    this.route = injector.get(ActivatedRoute);
  }

  route: ActivatedRoute;

  slideConfig = {
    vertical: true,
    // autoplay:true,
    verticalSwiping: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: false,
    nextArrow: false,
  }
  currentSlideIndex = 0; // Track the current slide index

  ngOnInit(): void {
    this.dataService.getData('home').subscribe((res: any) => {
      if (res.success) {
        this.timeline = res.result.timeLine;
        this.timelineHeader = res.result.timeLineHeader;
        this.timeLineTitle = this.timelineHeader.timeLineTitle;
        this.timeLineParagraph = this.timelineHeader.timeLineParagraph;
        this.cdr.detectChanges();
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
