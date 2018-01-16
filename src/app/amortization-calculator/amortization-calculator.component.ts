import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-amortization-calculator',
    templateUrl: './amortization-calculator.component.html',
    styleUrls: ['./amortization-calculator.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AmortizationCalculatorComponent implements OnInit {

    loanAmount: number;
    length: number;
    interestRate: number;

    extraPayments: number;
    extraPaymentsType: boolean;

    monthlyPayment;

    table;

    constructor() { }

    ngOnInit() {}

    loanAmountUpdate(loanAmount) {
        this.loanAmount = this.elValToNum(loanAmount);
    }

    lengthUpdate(year, month) {
        const years = year.value = this.elValToNum(year);
        const monthTemp = this.elValToNum(month);
        const months = month.value = monthTemp > 12 ? 12 : monthTemp;
        this.length = (years * 12) + months;
    }

    elValToNum(el) {
        const convert = parseInt(el.value, 10);
        return el.value = convert ? convert < 0 ? 0 : convert : 0;
    }

    interestRateUpdate(interestPercentage) {
        this.interestRate = interestPercentage / 100;
    }

    calculatePayment() {
        this.monthlyPayment = (this.loanAmount / this.length).toFixed(2);
    }

}
