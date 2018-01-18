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

    // converts value to a number 0 or greater
    elValToNum(val): number {
        const convert: number = parseInt(val, 10);
        return convert ? convert < 0 ? 0 : convert : 0;
    }

    // Updates loan input
    loanAmountUpdate(): void {
        this.loanAmount = this.elValToNum(this.loanAmount);
    }

    // Make sure month field can't go higher than 12
    updateMonth(val): number {
        const temp: number = this.elValToNum(val);
        return temp > 12 ? 12 : temp;
    }

    // First verifies years and months fields then combines them to time
    lengthUpdate(): void {
        this.years = this.elValToNum(this.years);
        this.months = this.updateMonth(this.months);
        this.time = (this.years * 12) + this.months;
    }

    // converts interest rate percentage to decimal
    interestRateUpdate(interestPercentage): number {
        return interestPercentage / 100;
    }

    // calculates the amortization table
    calculate(): void {
        this.table = this.amortization();
    }

    // The magic
    amortization(): Amortization[] {
        let balance: number = this.loanAmount;
        const monthlyRate: number = this.interestRateUpdate(this.interestRate) / 12;
        const terms: number = this.time;
        this.monthlyPayment = balance * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -terms)));

        let table: Amortization[];
        table = [];
        // in-loop interest amount holder
        let interest: number = 0;
        // in-loop monthly principal amount holder
        let monthlyPrincipal: number = 0;
        let principal: number = 0;

        for (let count = 0; count < terms; count++) {

            // code for displaying in loop balance
            balance = parseFloat(balance.toFixed(2));

            // calc the in-loop interest amount
            interest = parseFloat((balance * monthlyRate).toFixed(2));

            // calc the in-loop monthly principal
            monthlyPrincipal = this.monthlyPayment - interest;
            principal = parseFloat(monthlyPrincipal.toFixed(2));

            table.push({
                balance: balance,
                interest: interest,
                principal: principal
            });

            // update the balance for each loop iteration
            balance = balance - monthlyPrincipal;
        }

        // code for displaying in loop balance
        balance = parseFloat(balance.toFixed(2));

        // calc the in-loop interest amount
        interest = parseFloat((balance * monthlyRate).toFixed(2));

        // calc the in-loop monthly principal
        monthlyPrincipal = this.monthlyPayment - interest;
        principal = parseFloat(monthlyPrincipal.toFixed(2));

        table.push({
            balance: balance,
            interest: interest,
            principal: principal
        });

        // update the balance for each loop iteration
        balance = balance - monthlyPrincipal;

        return table;
    }

}


interface Amortization {
    balance: number;
    interest: number;
    principal: number;
}
