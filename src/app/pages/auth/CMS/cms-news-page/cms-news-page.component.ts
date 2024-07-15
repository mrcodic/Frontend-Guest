import { Component } from '@angular/core';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { MessageService } from 'primeng/api';
import { CMSNews } from '../../../../data-model/cms.model';

@Component({
  selector: 'app-cms-news-page',
  templateUrl: './cms-news-page.component.html',
  styleUrl: './cms-news-page.component.scss',
})
export class CmsNewsPageComponent {
  pageTitle: string = 'News';

  [key: string]: any;
  newsId!: ID;
  headerLabel!: string;
  headerImage: { image: string | null; base64Image: string } = {
    image: '',
    base64Image: '',
  };
  news!: {
    _id: ID | null;
    content: string;
    title: string;
    link: string;
    image: string;
    base64Image: string;
  }[];
  modifiedNews!: {
    _id: ID | null;
    content: string;
    title: string;
    link: string;
    image: string;
  }[];

  constructor(
    private newsService: CrudService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    this.newsService.getByID<CMSNews>('', 'admin/cms/news').subscribe((res) => {
      if (res.success) {
        this.newsId = res.result._id;
        this.headerLabel = res.result.header.label;
        this.headerImage.image = res.result.header.image;
        this.handleNewsArr(res.result.news, 'API');
      }
    });
  }

  formSubmitted() {
    let updateData: CMSNews = {
      _id: this.newsId,
      header: {
        image: this.headerImage.base64Image
          ? this.headerImage.base64Image
          : null,
        label: this.headerLabel,
      },
      news: this.modifiedNews,
    };
    this.callCrudApi(updateData);
  }

  fileUploaded(data: any, image: string) {
    if (this.hasOwnProperty(image)) {
      this[image].base64Image = data.imageBase64;
    }
  }
  handleNewsArr(newsArr: any, action: string, index?: number, data?: any) {
    switch (action) {
      case 'API':
        let modifiedMembers = newsArr.map((el: any) => {
          return { ...el, base64Image: '' };
        });
        this.news = modifiedMembers;
        break;
      case 'ADD':
        this.news.push({
          _id: null,
          content: '',
          title: '',
          link: '',
          image: '',
          base64Image: '',
        });
        break;
      case 'REMOVE':
        if (index || index == 0) this.news.splice(index, 1);
        break;
      case 'IMAGE':
        if ((index || index == 0) && data) {
          this.news[index] = {
            ...this.news[index],
            base64Image: data.imageBase64,
          };
        }
        break;
      case 'SUBMIT':
        this.modifiedNews = this.news.map((el: any) => {
          if (el.base64Image) {
            return {
              _id: el._id,
              content: el.content,
              title: el.title,
              link: el.link,
              image: el.base64Image,
            };
          } else {
            return {
              _id: el._id,
              content: el.content,
              title: el.title,
              link: el.link,
              image: null,
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
    this.newsService
      .update<CMSNews>(data, '', 'admin/cms/news')
      .subscribe((res) => {
        if (res.success) {
          this.reloadPage();
        }
      });
  }
}
