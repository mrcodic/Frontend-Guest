import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from '../../service/loading.service';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-adminpanel-layout',
  templateUrl: './adminpanel-layout.component.html',
  styleUrl: './adminpanel-layout.component.scss',
})
export class AdminpanelLayoutComponent {
  collapsed: boolean = false;
  items!: MenuItem[];
  title = 'angular-boilerplate';
  userRole: any;
  userImage!: string;
  userName: any;
  loading: boolean = false;

  constructor(
    private renderer: Renderer2,
    private authService: AuthenticationService,
    private _loading: LoadingService
  ) {
    this.checkScreenWidth();
    this.items = [
      {
        label: 'Dashboard',
        icon: 'fas fa-chart-pie ',
        routerLink: '/authentication/adminpanel/dashboard',
      },
      {
        label: 'Users',
        icon: 'fas fa-user  ',
        routerLink: '/authentication/adminpanel/users',
      },
      {
        label: 'CMS',
        icon: 'fas fa-cogs',
        expanded: true,
        items: [
          {
            label: 'Board',
            icon: 'fas fa-users',
            routerLink: '/authentication/adminpanel/cms-board',
          },
          {
            label: 'Team',
            icon: 'fas fa-users-cog',
            routerLink: '/authentication/adminpanel/cms-team',
          },
          {
            label: 'Who we are',
            icon: 'fas fa-quote-left',
            routerLink: '/authentication/adminpanel/cms-who-we-are',
          },
          {
            label: 'Gallery',
            icon: 'fas fa-images',
            routerLink: '/authentication/adminpanel/cms-gallery',
          },
          {
            label: 'Social Responsibility',
            icon: 'fas fa-layer-group',
            routerLink: '/authentication/adminpanel/cms-social',
            // expanded: true,
            // items: [
            //   {
            //     label: 'Add Social',
            //     icon: 'fas fa-plus',
            //     routerLink: '/authentication/adminpanel/cms-social/cms-add-social',
            //   },
            // ]
          },
          {
            label: 'Companies',
            icon: 'fas fa-building',
            routerLink: '/authentication/adminpanel/cms-companies',
            // expanded: true,
            // items: [
            //   {
            //     label: 'Edit Company',
            //     icon: 'fas fa-edit',
            //     routerLink: '/authentication/adminpanel/cms-companies/cms-edit-company',
            //   }
            // ]
          },
          {
            label: 'Home',
            icon: 'fas fa-home',
            routerLink: '/authentication/adminpanel/cms-home',
          },
        ],
      },
      {
        label: 'Careers',
        icon: 'fas fa-briefcase ',
        routerLink: '/authentication/adminpanel/careers',
      },
      {
        label: 'Contact Us',
        icon: 'fas fa-envelope ',
        routerLink: '/authentication/adminpanel/contact-us',
      },
      {
        label: 'Blogs',
        icon: 'fas fas fa-pen-nib',
        items: [
          {
            label: 'Add New Post',
            icon: 'fas fas fa-plus-square',
            routerLink: '/authentication/adminpanel/add-blog',
          },
          {
            label: 'All Posts',
            icon: 'fas fa-list',
            routerLink: '/authentication/adminpanel/all-blogs',
          },
          {
            label: 'Drafts',
            icon: 'fas fa-exclamation-circle',
            routerLink: '/authentication/adminpanel/drafts',
          },
          {
            label: 'Category',
            icon: 'fas fa-layer-group',
            routerLink: '/authentication/adminpanel/category',
          },
          {
            label: 'Tags',
            icon: 'fas fa-tags',
            routerLink: '/authentication/adminpanel/tags',
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'fas fa-tools',
        items: [
          {
            label: 'Social Media',
            icon: 'fas fa-share-alt',
            routerLink: '/authentication/adminpanel/cms-social-media',
          },
          {
            label: 'Emails',
            icon: 'pi pi-envelope',
            routerLink: '/authentication/adminpanel/cms-emails',
          },
        ],
      },
      {
        label: 'Profile',
        icon: 'fas fa-id-badge',
        items: [
          {
            label: 'Edit Profile',
            icon: 'fas fa-edit',
            routerLink: '/authentication/adminpanel/profile',
          },
          {
            label: 'Logout',
            icon: 'fas fa-sign-out-alt',
            command: () => this.authService.logout(true),
          },
        ],
      },
    ];
  }

  logoutFunction() {
    this.authService.logout(true);
  }

  ngOnInit() {
    this.listenToLoading();
    this.userName = localStorage.getItem('AlkhaldiName');
    this.userRole = localStorage.getItem('AlkhaldiRole');
    console.log(localStorage.getItem('AlkhaldiImage'));
    this.userImage = localStorage.getItem('AlkhaldiImage')!;
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
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
