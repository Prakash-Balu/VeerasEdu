import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingComponent } from './calling.component';

describe('CallingComponent', () => {
  let component: CallingComponent;
  let fixture: ComponentFixture<CallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
