import { Component, HostListener, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-author-layout',
  templateUrl: './author-layout.component.html',
  styleUrl: './author-layout.component.scss',
})
export class AuthorLayoutComponent {
  collapsed: boolean = false;
  items!: MenuItem[];

  constructor(
    private renderer: Renderer2,
    private authService: AuthenticationService
  ) {
    this.checkScreenWidth();
    this.items = [
      {
        label: 'Blogs',
        items: [
          {
            label: 'Blogs',
            icon: 'pi pi-fw pi-list',
            routerLink: '/authentication/authorpanel/all-blogs',
          },
          {
            label: 'Drafts',
            icon: 'pi pi-fw pi-th-large',
            routerLink: '/authentication/authorpanel/drafts',
          },
        ],
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Edit Profile',
            icon: 'pi pi-fw pi-list',
            routerLink: '/authentication/authorpanel/profile',
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-th-large',
            command: () => this.authService.logout(true),
          },
        ],
      },
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    const screenWidth = window.innerWidth;
    this.collapsed = screenWidth <= 768;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
}
