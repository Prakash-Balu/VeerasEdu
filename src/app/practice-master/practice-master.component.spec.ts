import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeMasterComponent } from './practice-master.component';

describe('PracticeMasterComponent', () => {
  let component: PracticeMasterComponent;
  let fixture: ComponentFixture<PracticeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
