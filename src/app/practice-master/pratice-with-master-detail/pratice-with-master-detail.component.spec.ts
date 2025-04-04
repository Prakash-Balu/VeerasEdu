import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PraticeWithMasterDetailComponent } from './pratice-with-master-detail.component';


describe('PraticeWithMasterDetailComponent', () => {
  let component: PraticeWithMasterDetailComponent;
  let fixture: ComponentFixture<PraticeWithMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraticeWithMasterDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PraticeWithMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
