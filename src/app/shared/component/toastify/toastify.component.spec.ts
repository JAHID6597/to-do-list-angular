import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastifyComponent } from './toastify.component';

describe('ToastifyComponent', () => {
  let component: ToastifyComponent;
  let fixture: ComponentFixture<ToastifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
