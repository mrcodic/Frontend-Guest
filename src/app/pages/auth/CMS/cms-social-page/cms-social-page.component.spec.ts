import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSocialPageComponent } from './cms-social-page.component';

describe('CmsSocialPageComponent', () => {
  let component: CmsSocialPageComponent;
  let fixture: ComponentFixture<CmsSocialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsSocialPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsSocialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
