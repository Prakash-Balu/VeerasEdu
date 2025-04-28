import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarnewComponent } from './sidebarnew.component';

describe('SidebarnewComponent', () => {
  let component: SidebarnewComponent;
  let fixture: ComponentFixture<SidebarnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarnewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
