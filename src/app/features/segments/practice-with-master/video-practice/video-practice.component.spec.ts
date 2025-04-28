import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPracticeComponent } from './video-practice.component';

describe('VideoPracticeComponent', () => {
  let component: VideoPracticeComponent;
  let fixture: ComponentFixture<VideoPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
