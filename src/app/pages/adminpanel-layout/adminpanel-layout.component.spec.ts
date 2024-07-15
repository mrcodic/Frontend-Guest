import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelLayoutComponent } from './adminpanel-layout.component';

describe('AdminpanelLayoutComponent', () => {
  let component: AdminpanelLayoutComponent;
  let fixture: ComponentFixture<AdminpanelLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminpanelLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminpanelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
