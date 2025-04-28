import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WistiaPlayerComponent } from './wistia-player.component';

describe('WistiaPlayerComponent', () => {
  let component: WistiaPlayerComponent;
  let fixture: ComponentFixture<WistiaPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WistiaPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WistiaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
