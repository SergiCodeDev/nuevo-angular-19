import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChildComponent } from './form-child.component';

describe('FormChildComponent', () => {
  let component: FormChildComponent;
  let fixture: ComponentFixture<FormChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
