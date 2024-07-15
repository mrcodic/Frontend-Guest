import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsBoardPageComponent } from './cms-board-page.component';

describe('CmsBoardPageComponent', () => {
  let component: CmsBoardPageComponent;
  let fixture: ComponentFixture<CmsBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsBoardPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
