import { ComponentFixture, TestBed } from '@angular/core/testing';

import { attedenceComponent } from './attedence.component';

describe('attedenceComponent', () => {
  let component: attedenceComponent;
  let fixture: ComponentFixture<attedenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [attedenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(attedenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
