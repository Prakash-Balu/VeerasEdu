import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalldefaultComponent } from './calldefault.component';

describe('CalldefaultComponent', () => {
  let component: CalldefaultComponent;
  let fixture: ComponentFixture<CalldefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalldefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalldefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
