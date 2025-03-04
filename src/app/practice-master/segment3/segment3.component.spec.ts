import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segment3Component } from './segment3.component';

describe('Segment3Component', () => {
  let component: Segment3Component;
  let fixture: ComponentFixture<Segment3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segment3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segment3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
