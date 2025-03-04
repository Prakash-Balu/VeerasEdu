import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentNewComponent } from './segment-new.component';

describe('SegmentNewComponent', () => {
  let component: SegmentNewComponent;
  let fixture: ComponentFixture<SegmentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
