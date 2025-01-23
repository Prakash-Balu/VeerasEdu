import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomplayerComponent } from './customplayer.component';

describe('CustomplayerComponent', () => {
  let component: CustomplayerComponent;
  let fixture: ComponentFixture<CustomplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
