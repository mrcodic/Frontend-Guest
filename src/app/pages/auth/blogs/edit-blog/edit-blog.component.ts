import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../../service/data.service';
import { CrudService } from '../../../../service/crud.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableColumns } from '../../../../data-model/data-table.model';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { DDLService } from '../../../../service/ddl.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  currentId: any;
  blogData: any;

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
  blogs: {}[] = [];
  display: boolean = false;
  action: string = 'add';
  pageTitle!: string;
  apiString!: string;
  imageChanged: boolean = false;;

  constructor(
    private dataService: DataService,
    private crudService: CrudService,
    private messageService: MessageService,
    private blogDDLService: DDLService,
  ) {}

  ngOnInit() {
    this.currentId = history.state.id;
    this.getBlogById();
    // this.dataService.getData('category').subscribe((res: any) => {
    //   if (res.success) {
    //     this.category = res.result;
    //   }
    // });
    // const categoryInput = this.inputs.find(
    //     (input) => input.formControlName === 'mainCategories'
    //   );
    this.blogDDLService.getDDL('category/DDL').subscribe((res) => {
        this.category = res.result;
        // this.bindCategorySelected();
        console.log(this.category)
      });
    this.dataService.getData('tags').subscribe((res: any) => {
      if (res.success) {
        this.tags = res.result;
        console.log(this.tags)
      }
    });
  }

  bindCategorySelected() {
    this.categorySelected.forEach(selectedId => {
      const selectedCategory = this.category.find(cat => cat._id === selectedId);
      if (selectedCategory) {
        console.log(selectedCategory)
        // Bind the name of the selected category to the appropriate element in your template
        // For example, if you have a div with the class "selected-category-name":
        // const selectedCategoryName = document.querySelector('.selected-category-name');
        // selectedCategoryName.textContent = selectedCategory.name;
      }
    });
  }

  getBlogById() {
    this.crudService.getByID(this.currentId, 'admin/blog').subscribe((res) => {
      this.blogData = res.result;
    //   console.log(this.blogData)
      this.patchFormData();
    });
  }

  patchFormData() {
    this.blog.title= this.blogData.title;
    this.categorySelected  = this.blogData.mainCategories;
    this.childrenSelected = this.blogData.subCategories;
    this.selectedTags = this.blogData.tags;
    this.excerpt = this.blogData.brief;
    this.blog.content = this.blogData.content;
    this.image = this.blogData.image;

    console.log(this.childrenSelected)
  }

  onChange(event: MultiSelectChangeEvent) {
    this.categorySelected = event.value.map((value: any) => value._id);
    this.selectedCategories = event.value.map((value: any) => value._id);
    // this.categorySelected=event.value.map((value: any) => value._id);
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
        this.image = base64Value;
        this.imageChanged = true;
      };
    }
  }

  convertImageToBase64(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Value = base64String.substring('data:image/jpeg;base64,'.length);
            resolve(base64Value);
          };
          reader.onerror = error => {
            reject(error);
          };
        })
        .catch(error => {
          reject(error);
        });
    });
  }


    publishBlog() {
      let obj = {
        title: this.title,
        content: this.content,
        image: this.image,
        excerpt: this.excerpt,
        mainCategories: this.categorySelected,
        subCategories: this.childrenSelected,
        tags: this.selectedTags,
        isPublished: true
      }
      console.log(obj);

    }
    onSubmit(action:string) {
      if (action =='publish') {
        if (this.imageChanged) {
            this.blog.image = this.image
        } else {
            this.image = this.convertImageToBase64(this.image);
        }
        this.blog.mainCategories  = this.categorySelected
        this.blog.subCategories = this.childrenSelected
        this.blog.tags = this.selectedTags
        this.blog.brief = this.excerpt
        this.blog.isPublished=true
      }else if (action=='draft') {
        this.blog.image = this.image
        this.blog.mainCategories  = this.categorySelected
        this.blog.subCategories = this.childrenSelected
        this.blog.tags = this.selectedTags
        this.blog.brief = this.excerpt
        this.blog.isPublished=false
      }
      console.log(this.blog);
      this.dataService.sendData(this.blog, 'edit-blog', this.currentId).subscribe((res: any) => {
        if (res.success) {
          this.messageService.add({severity:'success', summary: 'Successful', detail: res.message, life: 3000});
        //   setTimeout(() => {
        //     this.reloadPage();

        //   }, 1000);
        }
      })
    }
    reloadPage() {
      window.location.reload();
    }

    getSelectedCategoryNames(selectedCategories: any[]): string {
        if (!selectedCategories || selectedCategories.length === 0) {
          return 'Select Categories';
        }

        return selectedCategories.map(category => {
          if (typeof category === 'string') {
            const foundCategory = this.category.find(cat => cat._id === category);
            return foundCategory ? foundCategory.name : '';
          } else if (typeof category === 'object' && category !== null) {
            return category.name;
          }
          return '';
        }).join(', ');
    }

    getSelectedItemsNames(selectedItems: any[], allItems: any[]): string {
        if (!selectedItems || selectedItems.length === 0) {
          return 'Select Items';
        }

        return selectedItems.map(item => {
          if (typeof item === 'string') {
            const foundItem = allItems.find(it => it._id === item);
            return foundItem ? foundItem.name : '';
          } else if (typeof item === 'object' && item !== null) {
            return item.name;
          }
          return '';
        }).join(', ');
      }



}

