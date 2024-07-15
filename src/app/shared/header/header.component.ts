import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare function scriptMain(): void;
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;

  constructor(private router: Router) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }

  closeOffcanvas(): void {
    const offcanvasElement = document.getElementById('offcanvasDarkNavbar') as HTMLElement;
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) {
      offcanvas.hide();
    }
  }

  ngOnInit(): void {
    scriptMain();
    const offcanvasElement = document.getElementById('offcanvasDarkNavbar') as HTMLElement;
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
      offcanvasElement.classList.remove('show');
      offcanvasElement.style.paddingRight = '';
      document.body.style.overflow = '';
    });

    // Scroll to top on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      }
    });
  }
}