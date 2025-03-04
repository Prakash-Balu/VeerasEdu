import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segment6Component } from './segment6.component';

describe('Segment6Component', () => {
  let component: Segment6Component;
  let fixture: ComponentFixture<Segment6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segment6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segment6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
