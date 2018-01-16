import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AmortizationCalculatorRoutingModule } from './amortization-calculator-routing.module';

import { AmortizationCalculatorComponent } from './amortization-calculator.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AmortizationCalculatorRoutingModule
    ],
    declarations: [AmortizationCalculatorComponent]
})
export class AmortizationCalculatorModule { }
