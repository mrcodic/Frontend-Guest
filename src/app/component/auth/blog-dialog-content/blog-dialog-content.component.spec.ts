import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDialogContentComponent } from './blog-dialog-content.component';

describe('BlogDialogContentComponent', () => {
  let component: BlogDialogContentComponent;
  let fixture: ComponentFixture<BlogDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogDialogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
