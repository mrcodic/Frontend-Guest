import { Component, Injector } from '@angular/core';
import { CmsService } from '../../service/cms.service';
import { ActivatedRoute } from '@angular/router';
declare function scriptMain(): void;
interface GalleryItem {
  _id: string;
  category: string;
  label: string;
  title: string;
  categoryAr: string;
  labelAr: string;
  titleAr: string;
  link: string;
  image: string;
}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  route: ActivatedRoute;
  apiString!: string;
  header!: string;
  image!: string;
  gallery!:GalleryItem[]
  filteredGalleryItems!:GalleryItem[]

  categories:string[] =[];

  constructor(
    private galleryService: CmsService,
    injector: Injector
  ) {
    this.route = injector.get(ActivatedRoute);
    this.apiString = this.route.snapshot.data['api'];
  }
  ngOnInit(): void {
    scriptMain();
    this.getallgallery();
  }
  getallgallery(){

    this.galleryService
  .getAll(`landing/gallery`)
  .subscribe((res) => {
    if (res.success) {
      this.gallery = res.result?.gallery;
      this.filteredGalleryItems = res.result?.gallery;
      this.header = res.result.header?.label;
      this.image = res.result.header?.image;
      // console.log(this.filteredGalleryItems);
      this.categories = [...new Set(this.filteredGalleryItems.map(item => item.category))];
      // console.log(this.categories);
    }
  });
  }
  filterGallery(category:string) {

    if (category === '') {
      this.filteredGalleryItems = [...this.gallery];
    } else {
      this.filteredGalleryItems = this.gallery.filter(item => item.category === category);
    }
  }

  navigateGallery(link: string){
    window.open(link, '_blank');
  }

}
