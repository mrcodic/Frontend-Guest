import { Component } from '@angular/core';
import { CMSGallery, CMSGalleryCategory } from '../../../../data-model/cms.model';
import { ID } from '../../../../shared/ServicesBase';
import { CrudService } from '../../../../service/crud.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cms-gallery-page',
  templateUrl: './cms-gallery-page.component.html',
  styleUrl: './cms-gallery-page.component.scss',
})
export class CmsGalleryPageComponent {
  pageTitle: string = 'Gallery';

  selectedCategory: any;
  selectedCategoryId: any;

  [key: string]: any;
  galleryId!: ID;
  headerLabel!: string;
  headerLabelAr!: string;
  headerImage: { image: string | null; base64Image: string } = {
    image: '',
    base64Image: '',
  };
  gallery!: {
    _id: ID | null;
    category: string;
    label: string;
    title: string;
    labelAr: string;
    titleAr: string;
    link: string;
    image: string;
    base64Image: string;
  }[];
  modifiedGallery!: {
    _id: ID | null;
    category: string;
    label: string;
    labelAr: string;
    title: string;
    titleAr: string;
    link: string;
    image: string;
  }[];

  categoryForm!: FormGroup;
  categories!: any;
  category!: any;
  categoryName!: any;

  isAdded:boolean = false;

  constructor(
    private galleryService: CrudService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.initializeCategoryForm();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPageData();
  }

  getPageData() {
    this.galleryService
      .getByID<CMSGallery>('', 'admin/cms/gallery')
      .subscribe((res) => {
        if (res.success) {
          this.galleryId = res.result._id;
          this.headerLabel = res.result.header.label;
          this.headerLabelAr = res.result.header.labelAr;
          this.headerImage.image = res.result.header.image;
          this.handleGalleryArr(res.result.gallery, 'API');
          // console.log(res.result.gallery)
        }
      });
  }

  getCategories(){
    this.galleryService
      .getByID<CMSGalleryCategory>('', 'admin/cms/gallery/category')
      .subscribe((res) => {
        this.categories = res.result;
        if (this.categories){
          this.categoryForm.setControl('categoryFormArray', this.fb.array([]));
          this.categories.forEach((element: any)=> {
            console.log(element)
            const category = this.fb.group({
              _id: [element._id, Validators.required],
              name: [element.name, Validators.required],
            });
            (this.categoryForm.get('categoryFormArray') as FormArray).push(category)
          })
        }
      });
  }

  formSubmitted() {
    let updateData: CMSGallery = {
      _id: this.galleryId,
      header: {
        image: this.headerImage.base64Image
          ? this.headerImage.base64Image
          : null,
        label: this.headerLabel,
        labelAr: this.headerLabelAr,
      },
      gallery: this.modifiedGallery,
    };
    this.callCrudApi(updateData);
  }

  fileUploaded(data: any, image: string) {
    if (this.hasOwnProperty(image)) {
      this[image].base64Image = data.imageBase64;
    }
  }
  handleGalleryArr(
    galleryArr: any,
    action: string,
    index?: number,
    data?: any
  ) {
    switch (action) {
      case 'API':
        let modifiedMembers = galleryArr.map((el: any) => {
          return { ...el, base64Image: '' };
          });
        console.log(modifiedMembers)
        this.gallery = modifiedMembers;
        break;
      case 'ADD':
        this.gallery.push({
          _id: null,
          category: '',
          label: '',
          title: '',
          labelAr: '',
          titleAr: '',
          link: '',
          image: '',
          base64Image: '',
        });
        break;
      case 'REMOVE':
        if (index || index == 0) this.gallery.splice(index, 1);
        break;
      case 'IMAGE':
        if ((index || index == 0) && data) {
          this.gallery[index] = {
            ...this.gallery[index],
            base64Image: data.imageBase64,
          };
        }
        break;
      case 'SUBMIT':
        // debugger
        this.modifiedGallery = this.gallery.map((el: any) => {
          if (el.base64Image) {
            return {
              _id: el._id,
              // category: el.category,
              // category: this.selectedCategoryId,
              category: el.category, // Use the updated category
              label: el.label,
              title: el.title,
              labelAr: el.labelAr,
              titleAr: el.titleAr,
              link: el.link,
              image: el.base64Image,
            };
          } else {
            return {
              _id: el._id,
              category: el.category,
              // category: this.selectedCategoryId,
              label: el.label,
              title: el.title,
              labelAr: el.labelAr,
              titleAr: el.titleAr,
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
    this.galleryService
      .update<CMSGallery>(data, '', 'admin/cms/gallery')
      .subscribe((res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          // this.reloadPage();
        }
      });
  }

  get getCategoryFrom() {
    return this.categoryForm.get('categoryFormArray') as FormArray;
  }

  initializeCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryFormArray: this.fb.array([
        this.fb.group({
          _id: [null, Validators.required],
          name: [null, Validators.required],
        }),
      ]),
    });
  }

  onSubmit(formName: string) {
    if (formName == 'categoryForm') {
      this.category = this.categoryForm.value;
      this.category.categoryFormArray.forEach((element: any) => {
        if (element) {
          const obj = {
            name: element.name
          };
          if (element._id) {
            const EditData = this.galleryService.update<CMSGalleryCategory>(obj, element._id, 'admin/cms/gallery/category');
            if (EditData) {
              EditData.subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.reloadPage();
                  // this.getCategories();
                } else {
                  // Handle error response
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.message,
                  });
                }
              });
            }
          } else {
            const sendData = this.galleryService.add<CMSGalleryCategory>(obj, 'admin/cms/gallery/category');
            if (sendData) {
              sendData.subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.reloadPage();
                  // this.getCategories();
                } else {
                  // Handle error response
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.message,
                  });
                }
              });
            }
          }
        }
      });
  
      let data: CMSGallery = {
        _id: this.galleryId,
        header: {
          image: this.headerImage.base64Image ? this.headerImage.base64Image : null,
          label: this.headerLabel,
          labelAr: this.headerLabelAr,
        },
        gallery: this.modifiedGallery,
      };
  
      this.callCrudApi(data);
    }
  }
  

  removeForm(index: number, formName: string, event: Event) {
    event.preventDefault();
    if(formName == 'categoryForm') {
      this.isAdded = true;
      this.confirmationService.confirm({
        message: `<div>
                <p>Do you want to delete this category?</p>
                <p class="warnDelete">Deleting this category will also delete all linked images. <br/> Are you sure you want to proceed?</p>
              </div>`,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const itemId = this.getCategoryFrom.at(index).get('_id')?.value;
          if (itemId) {
            this.galleryService
              .delete(itemId, 'admin/cms/gallery/category')
              .subscribe((res: any) => {
                if (res.success) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                  });
                  this.getCategoryFrom.removeAt(index);
                }
              });
          }
          this.getCategoryFrom.removeAt(index);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
          });
        },
      });
    }
  }

  addForm(formName: string, event: Event) {
    event.preventDefault();
    if (formName == 'categoryForm') {
      this.getCategoryFrom?.push(
        this.fb.group({
          _id: [null, Validators.required],
          name: [null, Validators.required]
        })
      );
      this.isAdded = true;
    }
  }

  onCategoryChange (event: any, index: number){
    // this.selectedCategoryId = event;
    this.gallery[index].category = event;
  }

  getCategoryName(category: { name: string, _id: string } | string): string {
    if (typeof category === 'string') {
      const foundCategory = this.categories.find((cat: { _id: string; }) => cat._id === category);
      return foundCategory ? foundCategory.name : '';
    } else if (typeof category === 'object' && category !== null) {
      return category.name;
    }
    return '';
  }
  
}
