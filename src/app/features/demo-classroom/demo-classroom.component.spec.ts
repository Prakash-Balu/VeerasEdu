import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoClassroomComponent } from './demo-classroom.component';

describe('DemoClassroomComponent', () => {
  let component: DemoClassroomComponent;
  let fixture: ComponentFixture<DemoClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoClassroomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
