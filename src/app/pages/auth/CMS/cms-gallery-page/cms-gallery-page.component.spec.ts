import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsGalleryPageComponent } from './cms-gallery-page.component';

describe('CmsGalleryPageComponent', () => {
  let component: CmsGalleryPageComponent;
  let fixture: ComponentFixture<CmsGalleryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsGalleryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsGalleryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
