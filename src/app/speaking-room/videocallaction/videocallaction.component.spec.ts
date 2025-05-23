import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallactionComponent } from './videocallaction.component';

describe('VideocallactionComponent', () => {
  let component: VideocallactionComponent;
  let fixture: ComponentFixture<VideocallactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideocallactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideocallactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
