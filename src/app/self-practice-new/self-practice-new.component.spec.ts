import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPracticeNewComponent } from './self-practice-new.component';

describe('SelfPracticeNewComponent', () => {
  let component: SelfPracticeNewComponent;
  let fixture: ComponentFixture<SelfPracticeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfPracticeNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfPracticeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
