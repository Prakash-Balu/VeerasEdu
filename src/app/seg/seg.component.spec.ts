import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegComponent } from './seg.component';

describe('SegComponent', () => {
  let component: SegComponent;
  let fixture: ComponentFixture<SegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
