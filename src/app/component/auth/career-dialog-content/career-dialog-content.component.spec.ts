import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerDialogContentComponent } from './career-dialog-content.component';

describe('CareerDialogContentComponent', () => {
  let component: CareerDialogContentComponent;
  let fixture: ComponentFixture<CareerDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerDialogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareerDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
