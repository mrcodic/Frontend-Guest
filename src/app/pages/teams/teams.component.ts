import { Component, Injector } from '@angular/core';
import { CmsService } from '../../service/cms.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  route: ActivatedRoute;
  apiString!: string;
  header!: string;
  image!: string;
  teams:any;
  title!: string;
  paragraph!: string;
  constructor(
    private teamService: CmsService,
    injector: Injector
  ) {
    this.route = injector.get(ActivatedRoute);
    this.apiString = this.route.snapshot.data['api'];
  }
  ngOnInit(): void {
    this.getallteams();
  }
  getallteams(){

    this.teamService
    .getAll(`landing/team`)
    .subscribe((res) => {
      if (res.success) {
        this.teams = res.result?.members;
        this.header= res.result.header?.label;
        this.image= res.result.header?.image;
        this.title= res.result?.title;
        this.paragraph= res.result?.paragraph;
      }
    });
  }
}
