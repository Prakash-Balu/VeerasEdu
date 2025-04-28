import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlansComponent } from './new-plans.component';

describe('NewPlansComponent', () => {
  let component: NewPlansComponent;
  let fixture: ComponentFixture<NewPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPlansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
