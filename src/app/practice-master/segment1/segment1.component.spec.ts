import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segment1Component } from './segment1.component';

describe('Segment1Component', () => {
  let component: Segment1Component;
  let fixture: ComponentFixture<Segment1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segment1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segment1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
