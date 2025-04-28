import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommentsComponent } from './new-comments.component';

describe('NewCommentsComponent', () => {
  let component: NewCommentsComponent;
  let fixture: ComponentFixture<NewCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
