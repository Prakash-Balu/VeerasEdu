import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segment2Component } from './segment2.component';

describe('Segment2Component', () => {
  let component: Segment2Component;
  let fixture: ComponentFixture<Segment2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segment2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
