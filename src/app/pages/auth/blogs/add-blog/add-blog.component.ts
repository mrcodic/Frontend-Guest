import { Component, Injector,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableColumns } from '../../../../data-model/data-table.model';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { ConfirmationService, MessageService   } from 'primeng/api';
import { DataService } from '../../../../service/data.service';
import { MultiSelectChangeEvent } from 'primeng/multiselect';




@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {


  blog: any = {};
  isPuplishPage!: boolean;
  category!: any[];
  categorySelected!:any[];
  children!: any[];
  childrenSelected!:any[];
  selectedCategories!: any[];
  tags!:any;
  selectedTags!:any[];
  image: any;
  title: any;
  content: any;
  excerpt: any;

  route!: ActivatedRoute;

  cols: DataTableColumns[] = [];
  blogId: ID = '';
  blogs: {}[] = [];
  display: boolean = false;
  action: string = 'add';
  pageTitle!: string;
  apiString!: string;

  constructor(
    private blogService: CrudService,
    private confirmationService: ConfirmationService,
    private dataService:DataService,
    injector: Injector,
    private messageService: MessageService
  ) {
    this.route = injector.get(ActivatedRoute);
    this.isPuplishPage = this.route.snapshot.data['isPuplishPage'];
    this.pageTitle = this.route.snapshot.data['pageTitle'];
    this.apiString = this.route.snapshot.data['api'];
  }

  ngOnInit() {
    this.dataService.getData('category').subscribe((res: any) => {
      if (res.success) {
        this.category = res.result
      }
    })
    this.dataService.getData('tags').subscribe((res: any) => {
      if (res.success) {
        this.tags = res.result
      }
    })

  }
  onChange(event: any) {

    this.selectedCategories = event.value.map((value: any) => value._id);
    this.categorySelected=event.value.map((value: any) => value._id);
    let obj = {parents:this.selectedCategories}
    this.dataService.sendData(obj,'categoryChildren').subscribe((res: any) => {
      if (res.success) {
        this.children = res.result
      }
    })
  }
  onChangeChildren($event: MultiSelectChangeEvent) {
    this.childrenSelected = $event.value.map((value: any) => value._id);
    }
  onChangeTags(event: MultiSelectChangeEvent) {
    this.selectedTags = event.value.map((value: any) => value._id);
  }

  onFileChange(event: Event, index?: number, formName?: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      let base64Value: string | string[] = '';
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        base64Value = base64String.substring('data:image/jpeg;base64,'.length);
        this.image = base64Value
      };
    }
  }


    publishBlog() {
      let obj = {
        title: this.title,
        content: this.content,
        image: this.image,
        excerpt: this.excerpt,
        category: this.categorySelected,
        subCategory: this.childrenSelected,
        tags: this.selectedTags,
        isPublished: true
      }
      console.log(obj);

    }
    onSubmit(action:string) {
      if (action =='publish') {
        this.blog.image = this.image
        this.blog.mainCategory  = this.categorySelected
        this.blog.subCategory = this.childrenSelected
        this.blog.tags = this.selectedTags
        this.blog.brief = this.excerpt
        this.blog.isPublished=true
      }else if (action=='draft') {
        this.blog.image = this.image
        this.blog.mainCategory  = this.categorySelected
        this.blog.subCategory = this.childrenSelected
        this.blog.tags = this.selectedTags
        this.blog.brief = this.excerpt
        this.blog.isPublished=false
      }
      console.log(this.blog);
      this.dataService.sendData(this.blog,'add-blog').subscribe((res: any) => {
        if (res.success) {
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Blog Added Successfully', life: 3000});
          setTimeout(() => {
            this.reloadPage();

          }, 1000);
        }
      })
    }
    reloadPage() {
      window.location.reload();
    }
  }
