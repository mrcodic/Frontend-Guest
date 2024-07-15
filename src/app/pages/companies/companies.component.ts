import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from '../../service/cms.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
declare function scriptMain(): void;
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {
  route: ActivatedRoute;
  header:any;
  currentCompany:any;
  companiesName: string[]= [];
  companies_id: string[]= [];
  companies: any[] = [];
  activeCompanyId: string = '';

  constructor(
    private companyService: CmsService,
    private sanitizer: DomSanitizer,
    injector: Injector,
  ) {
    this.route = injector.get(ActivatedRoute);
  }
  ngOnInit(): void {
    this.getallcompanies();
  }
  getallcompanies(){
    this.companyService
    .getAll(`landing/company`)
    .subscribe((res) => {
      if (res.success) {
            this.header=res.result.header;
            this.companies = res.result.companies;
            res.result.companies.forEach((member: { name: string; }) => {
              if (member.name) {
                this.companiesName.push(member.name);
              }
            });
            res.result.companies.forEach((member: { _id: string; }) => {
              if (member._id) {
                this.companies_id.push(member._id);
              }
            });
            // Sort the companies by createdAt date in descending order
          this.companies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          // Set the first item in the sorted list as the active item and update currentCompany
          if (this.companies.length > 0) {
            this.getCompanyData(this.companies[0]._id);
          }
          }
        });
  }
  getCompanyData(companyId: string) {
    this.getById(companyId);
    this.activeCompanyId = companyId;
  }

  sanitizeHtml(html: string): SafeHtml {
    const safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return safeHtml;
  }

  getById(companyId: string) {
    this.companyService
      .getByID(companyId, 'landing/company')
      .subscribe((res) => {
        if (res.success) {
          this.currentCompany = res.result;
          console.log(this.currentCompany);
        }
      });
  }
}
