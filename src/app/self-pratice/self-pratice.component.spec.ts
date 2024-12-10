import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPraticeComponent } from './self-pratice.component';

describe('SelfPraticeComponent', () => {
  let component: SelfPraticeComponent;
  let fixture: ComponentFixture<SelfPraticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfPraticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfPraticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
