import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationCalculatorComponent } from './amortization-calculator.component';

describe('AmortizationCalculatorComponent', () => {
  let component: AmortizationCalculatorComponent;
  let fixture: ComponentFixture<AmortizationCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmortizationCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
