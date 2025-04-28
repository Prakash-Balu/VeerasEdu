import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPracticeV2Component } from './self-practice-v2.component';

describe('SelfPracticeV2Component', () => {
  let component: SelfPracticeV2Component;
  let fixture: ComponentFixture<SelfPracticeV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfPracticeV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfPracticeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
