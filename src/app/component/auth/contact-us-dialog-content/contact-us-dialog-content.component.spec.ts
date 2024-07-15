import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsDialogContentComponent } from './contact-us-dialog-content.component';

describe('ContactUsDialogContentComponent', () => {
  let component: ContactUsDialogContentComponent;
  let fixture: ComponentFixture<ContactUsDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsDialogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactUsDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
