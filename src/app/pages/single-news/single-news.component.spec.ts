import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNewsComponent } from './single-news.component';

describe('NewsComponent', () => {
  let component: SingleNewsComponent;
  let fixture: ComponentFixture<SingleNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
