import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-amortization-calculator',
    templateUrl: './amortization-calculator.component.html',
    styleUrls: ['./amortization-calculator.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AmortizationCalculatorComponent implements OnInit {

    loanAmount: number;
    time: number;
    interestRate: number;

    years: number;
    months: number;

    monthlyPayment: number;

    extraPayments: number;
    extraPaymentsType: number;

    table: Amortization[];

    constructor() { }

    ngOnInit() {
        this.loanAmount = 0;
        this.time = 0;
        this.interestRate = 0;
        this.years = 0;
        this.months = 0;
        this.monthlyPayment = 0;
        this.extraPayments = 0;
        this.extraPaymentsType = 0;
    }

    // converts an element's value to a number 0 or greater
    elValToNum(val): number {
        const convert: number = parseInt(val, 10);
        return convert ? convert < 0 ? 0 : convert : 0;
    }

    loanAmountUpdate(): void {
        this.loanAmount = this.elValToNum(this.loanAmount);
    }

    lengthUpdate(): void {
        this.years = this.elValToNum(this.years);
        this.months = this.updateMonth(this.months);
        this.time = (this.years * 12) + this.months;
    }

    updateMonth(val): number {
        const temp: number = this.elValToNum(val);
        return temp > 12 ? 12 : temp;
    }

    interestRateUpdate(interestPercentage): number {
        return interestPercentage / 100;
    }

    calculate(): void {
        this.table = this.amortization();
    }

    amortization(): Amortization[] {
        let month: number = 0;
        let balance: number = this.loanAmount;
        const monthlyRate: number = this.interestRateUpdate(this.interestRate) / 12;
        const terms: number = this.time;
        this.monthlyPayment = balance * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -terms)));

        let table: Amortization[];
        table = [];
        // in-loop interest amount holder
        let interest: any = 0;
        // in-loop monthly principal amount holder
        let monthlyPrincipal = 0;
        let principal: any = 0;

        for (let count = 0; count < terms; count++) {

            // display the month number in col 1 using the loop count variable
            month = (count + 1);

            // code for displaying in loop balance
            balance = parseFloat(balance.toFixed(2));

            // calc the in-loop interest amount
            interest = parseFloat((balance * monthlyRate).toFixed(2));

            // calc the in-loop monthly principal
            monthlyPrincipal = this.monthlyPayment - interest;
            principal = parseFloat(monthlyPrincipal.toFixed(2));

            table.push({
                month: month,
                balance: balance,
                interest: interest,
                principal: principal
            });

            // update the balance for each loop iteration
            balance = balance - monthlyPrincipal;
        }
        return table;
    }

}


interface Amortization {
    month: number;
    balance: number;
    interest: number;
    principal: number;
}
