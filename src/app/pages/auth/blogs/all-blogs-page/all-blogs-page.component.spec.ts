import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlogsPageComponent } from './all-blogs-page.component';

describe('AllBlogsPageComponent', () => {
  let component: AllBlogsPageComponent;
  let fixture: ComponentFixture<AllBlogsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBlogsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllBlogsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
