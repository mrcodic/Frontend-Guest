import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingLayoutPageComponent } from './landing-layout-page.component';

describe('LandingLayoutPageComponent', () => {
  let component: LandingLayoutPageComponent;
  let fixture: ComponentFixture<LandingLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingLayoutPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
