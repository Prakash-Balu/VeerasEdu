import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segment8Component } from './segment8.component';

describe('Segment8Component', () => {
  let component: Segment8Component;
  let fixture: ComponentFixture<Segment8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segment8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segment8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
