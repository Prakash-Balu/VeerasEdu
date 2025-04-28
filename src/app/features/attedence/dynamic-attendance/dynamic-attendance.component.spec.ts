import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAttendanceComponent } from './dynamic-attendance.component';

describe('DynamicAttendanceComponent', () => {
  let component: DynamicAttendanceComponent;
  let fixture: ComponentFixture<DynamicAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
