import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsCompaniesPageComponent } from './cms-companies-page.component';

describe('CmsCompaniesPageComponent', () => {
  let component: CmsCompaniesPageComponent;
  let fixture: ComponentFixture<CmsCompaniesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsCompaniesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsCompaniesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
