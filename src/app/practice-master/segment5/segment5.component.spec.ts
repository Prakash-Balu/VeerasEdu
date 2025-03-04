import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segment5Component } from './segment5.component';

describe('Segment5Component', () => {
  let component: Segment5Component;
  let fixture: ComponentFixture<Segment5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segment5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segment5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
