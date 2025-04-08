import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracitceWithMasterNewComponent } from './pracitce-with-master-new.component';

describe('PracitceWithMasterNewComponent', () => {
  let component: PracitceWithMasterNewComponent;
  let fixture: ComponentFixture<PracitceWithMasterNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracitceWithMasterNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracitceWithMasterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
