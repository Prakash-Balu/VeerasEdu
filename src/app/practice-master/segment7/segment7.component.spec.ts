import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segment7Component } from './segment7.component';

describe('Segment7Component', () => {
  let component: Segment7Component;
  let fixture: ComponentFixture<Segment7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segment7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segment7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
