import { Component } from '@angular/core';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { MessageService } from 'primeng/api';
import { CMSTeam } from '../../../../data-model/cms.model';

@Component({
  selector: 'app-cms-team-page',
  templateUrl: './cms-team-page.component.html',
  styleUrl: './cms-team-page.component.scss',
})
export class CmsTeamPageComponent {
  pageTitle: string = 'Team';

  [key: string]: any;
  teamId!: ID;
  headerLabel!: string;
  headerLabelAr!: string;
  headerImage: { image: string | null; base64Image: string } = {
    image: '',
    base64Image: '',
  };
  title!: string;
  paragraph!: string;
  members!: {
    _id: ID | null;
    name: string;
    role: string;
    bio: string;
    nameAr: string;
    roleAr: string;
    bioAr: string;
    image: string | null;
    base64Image: string;
    order: number;
  }[];
  modifiedMembers!: {
    _id: ID;
    name: string;
    role: string;
    bio: string;
    nameAr: string;
    roleAr: string;
    bioAr: string;
    image: string | null;
    order: number;
  }[];

  isMoving = false;
  reorderedPartners: any[] = [];

  constructor(
    private teamService: CrudService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    this.teamService.getByID<CMSTeam>('', 'admin/cms/team').subscribe((res) => {
      if (res.success) {
        this.teamId = res.result._id;
        this.headerLabel = res.result.header.label;
        this.headerLabelAr = res.result.header.labelAr;
        this.headerImage.image = res.result.header.image;
        this.title = res.result.title;
        this.paragraph = res.result.paragraph;
        this.handleMembersArr(res.result.members, 'API');
      }
    });
  }

  formSubmitted() {
    let updateData: CMSTeam = {
      _id: this.teamId,
      title: this.title,
      paragraph: this.paragraph,
      header: {
        image: this.headerImage.base64Image
          ? this.headerImage.base64Image
          : null,
        label: this.headerLabel,
        labelAr: this.headerLabelAr,
      },
      members: this.modifiedMembers,
    };
    this.callCrudApi(updateData);
  }

  fileUploaded(data: any, image: string) {
    if (this.hasOwnProperty(image)) {
      this[image].base64Image = data.imageBase64;
    }
  }
  handleMembersArr(
    membersArr: any,
    action: string,
    index?: number,
    data?: any
  ) {
    switch (action) {
      case 'API':
        let modifiedMembers = membersArr.map((el: any) => {
          return { ...el, base64Image: '' };
        });
        this.members = modifiedMembers;
        break;
      case 'ADD':
        this.members.push({
          _id: null,
          name: '',
          bio: '',
          role: '',
          nameAr: '',
          bioAr: '',
          roleAr: '',
          image: '',
          base64Image: '',
          order: this.members.length + 1
        });
        break;
      case 'REMOVE':
        if (index || index == 0) this.members.splice(index, 1);
        this.updateReorderedPartners();
        break;
      case 'IMAGE':
        if ((index || index == 0) && data) {
          this.members[index] = {
            ...this.members[index],
            base64Image: data.imageBase64,
          };
        }
        break;
      case 'SUBMIT':
        this.modifiedMembers = this.members.map((el: any) => {
          if (el.base64Image) {
            return {
              _id: el._id,
              name: el.name,
              role: el.role,
              bio: el.bio,
              nameAr: el.nameAr,
              roleAr: el.roleAr,
              bioAr: el.bioAr,
              image: el.base64Image,
              order: el.order
            };
          } else {
            return {
              _id: el._id,
              name: el.name,
              role: el.role,
              bio: el.bio,
              nameAr: el.nameAr,
              roleAr: el.roleAr,
              bioAr: el.bioAr,
              image: null,
              order: el.order
            };
          }
        });
        this.formSubmitted();
        break;
      default:
        break;
    }
  }

  reloadPage() {
    window.location.reload();
  }
  callCrudApi(data: any) {
    this.teamService
      .update<CMSTeam>(data, '', 'admin/cms/team')
      .subscribe((res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.reloadPage();
        }
      });
  }

  moveUp(index: number) {
    if (index > 0) {
      this.isMoving = true;
      const item = this.members[index];
      this.members.splice(index, 1);
      this.members.splice(index - 1, 0, item);
  
      // Update orders
      this.members[index].order = index + 1;
      this.members[index - 1].order = index;
  
      setTimeout(() => {
        this.isMoving = false;
        this.updateReorderedPartners();
      }, 300);
    }
  }
  
  
  moveDown(index: number) {
    if (index < this.members.length - 1) {
      this.isMoving = true;
      const item = this.members[index];
      this.members.splice(index, 1);
      this.members.splice(index + 1, 0, item);
  
      // Update orders
      this.members[index].order = index + 1;
      this.members[index + 1].order = index + 2;
  
      setTimeout(() => {
        this.isMoving = false;
        this.updateReorderedPartners();
      }, 300);
    }
  }
  
  
  getTransform(index: number): string {
    return `translateY(${index * 5}%)`;
  }
  
  updateReorderedPartners() {
    this.reorderedPartners = this.members.map((member, index) => {
      member.order = index + 1; // Update the order property
      return member;
    });
    console.log(this.reorderedPartners);
  }
  
}