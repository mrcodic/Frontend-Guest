import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogContentComponent } from './user-dialog-content.component';

describe('UserDialogContentComponent', () => {
  let component: UserDialogContentComponent;
  let fixture: ComponentFixture<UserDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDialogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
