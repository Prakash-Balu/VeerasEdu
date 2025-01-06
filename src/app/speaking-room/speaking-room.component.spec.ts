import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingRoomComponent } from './speaking-room.component';

describe('SpeakingRoomComponent', () => {
  let component: SpeakingRoomComponent;
  let fixture: ComponentFixture<SpeakingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakingRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
