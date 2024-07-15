import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDialogContentComponent } from './tag-dialog-content.component';

describe('TagDialogContentComponent', () => {
  let component: TagDialogContentComponent;
  let fixture: ComponentFixture<TagDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagDialogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
