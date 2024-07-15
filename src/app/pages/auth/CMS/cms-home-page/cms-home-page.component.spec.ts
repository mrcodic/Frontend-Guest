import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsHomePageComponent } from './cms-home-page.component';

describe('CmsHomePageComponent', () => {
  let component: CmsHomePageComponent;
  let fixture: ComponentFixture<CmsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
