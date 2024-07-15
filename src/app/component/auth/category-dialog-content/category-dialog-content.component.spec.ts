import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDialogContentComponent } from './category-dialog-content.component';

describe('CategoryDialogContentComponent', () => {
  let component: CategoryDialogContentComponent;
  let fixture: ComponentFixture<CategoryDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryDialogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
