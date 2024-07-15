import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsWhowearePageComponent } from './cms-whoweare-page.component';

describe('CmsWhowearePageComponent', () => {
  let component: CmsWhowearePageComponent;
  let fixture: ComponentFixture<CmsWhowearePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsWhowearePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsWhowearePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
