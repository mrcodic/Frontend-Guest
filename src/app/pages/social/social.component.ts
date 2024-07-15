import { Component, Injector } from '@angular/core';
import { ID } from '../../shared/ServicesBase';
import { CrudService } from '../../service/crud.service';
import { CMSHeaderSocial } from '../../data-model/cms.model';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from '../../service/cms.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
declare function scriptMain(): void;
declare var $: any;
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrl: './social.component.css',
})
export class SocialComponent {
  socialId: ID = '';
  socials: {}[] = [];
  route: ActivatedRoute;
  apiString!: string;
  header!: string;
  image!: string;
  title: string[]= [];
  data:any;

  createdDate: string[] = [];
  selectedItem: any;
  filteredData: any[] = [];

  fromDate: string = '';
  toDate: string = '';
  members: any[] = [];

  socailMembers: any[] = [];
  activeCompanyId: string = '';
  currentItem:any;

  dateFrom: any;
  dateTo: any;
  filteredMembers: any[] = [];
  dateRange: Date[] = [];

  constructor(
    private socialService: CmsService,
    injector: Injector,
    private sanitizer: DomSanitizer,
  ) {
    this.route = injector.get(ActivatedRoute);
    this.apiString = this.route.snapshot.data['api'];
  }
  ngOnInit(): void {
    this.getAllSocials();
    // Initialize filteredMembers with all socailMembers
    this.filteredMembers = [...this.socailMembers];
  }

  getAllSocials(){
    this.socialService
    .getAll(`landing/social`)
    .subscribe((res) => {
      if (res.success) {
        this.data = res.result;
        this.header=res.result.header?.label;
        this.image=res.result.header?.image;
        this.socailMembers = res.result.socailMembers;
        res.result.socailMembers.forEach((member: { title: string; }) => {
          if (member.title) {
            this.title.push(member.title);
          }
        });
        res.result.socailMembers.forEach((member: { createdAt: string; }) => {
          if (member.createdAt) {
            this.createdDate.push(member.createdAt);
          }
        });
        this.filteredMembers = this.socailMembers;
        // console.log(this.createdDate)

        // Sorting in descending order
        this.filteredMembers = this.socailMembers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Set the latest company as the default company
        if (this.socailMembers.length > 0) {
          const firstItemId = this.filteredMembers[0]._id;
          this.getData(firstItemId);
          this.activeCompanyId = this.filteredMembers[0]._id;
        }
      }
    });
  }

  onDateChange() {
    if (this.dateRange && this.dateRange.length === 2) {
      const [startDate, endDate] = this.dateRange;
      this.filteredMembers = this.socailMembers.filter(member => {
        const createdAt = new Date(member.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // this.filteredMembers = [...this.socailMembers];
      this.filteredMembers = [...this.socailMembers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  getData(companyId: string) {
    this.getById(companyId);
    this.activeCompanyId = companyId;
  }

  sanitizeHtml(html: string): SafeHtml {
    const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return safeHtml;
  }

  getById(companyId: string) {
    this.socialService
      .getByID(companyId, 'landing/social')
      .subscribe((res) => {
        if (res.success) {
          this.currentItem = res.result;
          // console.log(this.currentItem);
        }
      });
  }

  ngOnChanges() {
    this.filterMembersByDate();
  }

  filterMembersByDate() {
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      this.filteredMembers = this.members.filter(member => {
        const createdDate = new Date(member.createdAt);
        return createdDate >= from && createdDate <= to;
      }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      this.filteredMembers = [...this.socailMembers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }
}
