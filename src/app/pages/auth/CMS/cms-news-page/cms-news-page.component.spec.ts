import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsNewsPageComponent } from './cms-news-page.component';

describe('CmsNewsPageComponent', () => {
  let component: CmsNewsPageComponent;
  let fixture: ComponentFixture<CmsNewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsNewsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
