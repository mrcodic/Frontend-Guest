import { Component, Injector } from '@angular/core';
import { CmsService } from '../../service/cms.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  route: ActivatedRoute;
  apiString!: string;
  headers!: any;
  constructor(
    private homeService: CmsService,
    injector: Injector
  ) {
    this.route = injector.get(ActivatedRoute);
    this.apiString = this.route.snapshot.data['api'];
  }
  ngOnInit(): void {
    this.getHomeBanner();
  }
  getHomeBanner(){
    this.homeService
    .getAll(`landing/home`)
    .subscribe((res) => {
      if (res.success) {
        this.headers=res.result.header;
        console.log(this.headers);
      }
    });
  }
}
