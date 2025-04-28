import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwarmifyPlayerComponent } from './swarmify-player.component';

describe('SwarmifyPlayerComponent', () => {
  let component: SwarmifyPlayerComponent;
  let fixture: ComponentFixture<SwarmifyPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwarmifyPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwarmifyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
