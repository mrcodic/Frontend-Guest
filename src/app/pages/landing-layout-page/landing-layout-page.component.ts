import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PreloaderComponent } from '../../component/preloader/preloader.component'; // Adjust the path as needed
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-landing-layout-page',
  templateUrl: './landing-layout-page.component.html',
  styleUrls: ['./landing-layout-page.component.css']
})
export class LandingLayoutPageComponent implements AfterViewInit {
  @ViewChild(PreloaderComponent) preloader!: PreloaderComponent;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Listen for router events and hide preloader on NavigationEnd
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.preloader.hidePreloader();
      });
  }
}
