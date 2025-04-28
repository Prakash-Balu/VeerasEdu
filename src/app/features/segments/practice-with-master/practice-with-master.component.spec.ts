import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeWithMasterComponent } from './practice-with-master.component';

describe('PracticeWithMasterComponent', () => {
  let component: PracticeWithMasterComponent;
  let fixture: ComponentFixture<PracticeWithMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeWithMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeWithMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
