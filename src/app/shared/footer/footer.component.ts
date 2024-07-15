import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { DataService } from '../../service/data.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  // social links
  socialMedia: any;
  facebook: any;
  twitter: any;
  linkedin: any;
  instagram: any;
  dripple: any;
  behance: any;
  location: any;

  constructor(
    private socialService: DataService,
  ) {}

  ngOnInit() {

    this.getScoialMedia();

    const scrollPath = document.querySelector('.scroll-up path') as SVGPathElement;
    const pathLength = scrollPath.getTotalLength();
    scrollPath.style.transition = scrollPath.style.webkitTransition = 'none';
    scrollPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    scrollPath.style.strokeDashoffset = `${pathLength}`;
    scrollPath.getBoundingClientRect();
    scrollPath.style.transition = scrollPath.style.webkitTransition = 'stroke-dashoffset 10ms linear';

    const updatescroll = () => {
      const scroll = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const offset = pathLength - (scroll * pathLength / height);
      scrollPath.style.strokeDashoffset = `${offset}`;
    };

    updatescroll();
    window.addEventListener('scroll', updatescroll);

    const offset = 50;
    const duration = 950;
    window.addEventListener('scroll', () => {
      const scrollUpElement = document.querySelector('.scroll-up');
      if (scrollUpElement) {
        if (window.pageYOffset > offset) {
          scrollUpElement.classList.add('active-scroll');
        } else {
          scrollUpElement.classList.remove('active-scroll');
        }
      }
    });

    const scrollUpElement = document.querySelector('.scroll-up');
    if (scrollUpElement) {
      scrollUpElement.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  getScoialMedia() {
    this.socialService.getData('socialMedia').subscribe((res: { result: any; }) => {
      this.socialMedia = res.result.socialMedia;
      this.location = res.result.location;
      this.facebook = this.socialMedia.facebook;
      this.twitter = this.socialMedia.twitter;
      this.instagram = this.socialMedia.instagram;
      this.linkedin = this.socialMedia.linkedin;
      this.behance = this.socialMedia.behance;
      this.dripple = this.socialMedia.dripple;
    })
  }
}
