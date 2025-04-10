import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selfv2Component } from './selfv2.component';

describe('Selfv2Component', () => {
  let component: Selfv2Component;
  let fixture: ComponentFixture<Selfv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selfv2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Selfv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
