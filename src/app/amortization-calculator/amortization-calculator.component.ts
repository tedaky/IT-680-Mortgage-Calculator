import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-amortization-calculator',
    templateUrl: './amortization-calculator.component.html',
    styleUrls: ['./amortization-calculator.component.scss']
})
export class AmortizationCalculatorComponent implements OnInit {
    //#region vars
    // Loan Amount
    loanAmount: number;
    // Loan Length in months
    time: number;
    // Loan Interest Rate
    interestRate: number;
    years: number;
    months: number;
    monthlyPayment: number;
    extraPayments: number;
    extraPaymentsType: string;
    totalPayments: number;
    table: Totals;
    //#endregion

    //#region extras
    open: string;
    //#endregion extras

    constructor() { }

    ngOnInit() {
        this.loanAmount = 0;
        this.time = 0;
        this.interestRate = 0;
        this.years = 0;
        this.months = 0;
        this.monthlyPayment = 0;
        this.extraPayments = 0;
        this.totalPayments = 0;
        this.open = 'opened';
        this.extraPaymentsType = 'monthly';
    }

    roundTo(number: number, digits: number) {
        let negative = false;

        digits = (digits === undefined) ? 0 : digits;

        if ( number < 0) {
            negative = true;
            number = number * -1;
        }

        const multiplicator = Math.pow(10, digits);
        number = parseFloat((number * multiplicator).toFixed(11));
        number = parseFloat((Math.floor(number) / multiplicator).toFixed(2));

        return number = (negative) ? parseFloat((number * -1).toFixed(2)) : number;
    }

    // converts value to a number 0 or greater
    elValToNum(val): number {
        const convert: number = parseInt(val, 10);
        return convert ? convert < 0 ? 0 : convert : 0;
    }

    // Make sure month field can't go higher than 12
    updateMonth(val): number {
        const temp: number = this.elValToNum(val);
        return temp > 12 ? 12 : temp;
    }

    // First verifies years and months fields then combines them to time
    lengthUpdate(): number {
        this.years = this.elValToNum(this.years);
        this.months = this.updateMonth(this.months);
        return (this.years * 12) + this.months;
    }

    // converts interest rate percentage to decimal
    interestRateUpdate(interestPercentage): number {
        return interestPercentage / 100;
    }

    monthlyRate(): number {
        return this.interestRateUpdate(this.interestRate) / 12;
    }

    // calculates the amortization table
    calculate(): void {
        this.loanAmount = this.elValToNum(this.loanAmount);
        this.time = this.lengthUpdate();

        this.monthlyPayment = this.calculateMonthlyPayment();
        this.totalPayments = this.time * this.monthlyPayment;

        this.table = this.amortization();

        this.open = 'closed';
    }

    // calculate monthly payment
    calculateMonthlyPayment(): number {
        const balance = this.loanAmount;
        const monthlyRate = this.monthlyRate();
        const terms = this.time;

        return this.roundTo(balance * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -terms))), 2);
    }

    // The magic
    amortization(): Totals {
        let balance: number = this.loanAmount;
        const monthlyRate: number = this.monthlyRate();
        // console.log(this.interestRateUpdate(this.interestRate) / 12);
        let monthlyPayment = this.calculateMonthlyPayment();

        let table: Amortization[];
        table = [];
        // in-loop interest amount holder
        let interest = 0;
        // in-loop monthly principal amount holder
        let monthlyPrincipal = 0;
        let principal = 0;
        let extra = this.roundTo(this.extraPayments, 2);
        let extraTemp = 0;

        let monthlyPaymentExtra = 0;
        let interestTotal = 0;
        let principalTotal = 0;
        let extraTotal = 0;
        let monthlyPaymentTotal = 0;
        let temp = 0;

        let iteration = 0;

        while (balance > 0) {
            iteration = iteration + 1;

            // code for displaying in loop balance
            balance = this.roundTo(balance, 2);

            // calc the in-loop interest amount
            interest = this.roundTo((balance * monthlyRate), 2);
            interestTotal = interestTotal + interest;

            // calc the in-loop monthly principal
            monthlyPayment = (monthlyPayment < balance) ? monthlyPayment : balance;
            monthlyPrincipal = monthlyPayment - interest;
            principal = this.roundTo(monthlyPrincipal, 2);
            principalTotal = principalTotal + principal;

            if ((this.extraPaymentsType === 'monthly') || (this.extraPaymentsType === 'yearly' && iteration === 12)) {
                // update the balance for each loop iteration
                temp = this.roundTo(balance - principal - interest - extra, 2);
                monthlyPaymentExtra = (temp > 0) ? monthlyPayment + extra : balance;
                extra = (temp > 0) ? extra : balance - monthlyPayment;
                extraTotal = extraTotal + extra;
                extraTemp = extra;
                if (iteration === 12) {
                    iteration = 0;
                }
            } else {
                extraTemp = 0;
            }

            balance = (this.roundTo(monthlyPayment + extraTemp, 2) < balance) ? this.roundTo(balance - principal - extraTemp, 2) : this.roundTo(balance - balance, 2);

            monthlyPaymentTotal = monthlyPaymentTotal + monthlyPaymentExtra;

            table.push({
                balance: balance,
                interest: interest,
                principal: principal + extraTemp,
                extra: extraTemp
            });
        }

        return {
            interest: interestTotal,
            principal: principalTotal + extraTotal,
            extra: extraTotal,
            monthlyPayment: monthlyPaymentTotal,
            balance: balance,
            table: table
        };
    }

    closeInput(): void {
        this.open = 'forced';
    }

    toggleInput(): void {
        this.open = (this.open === 'opened') ? 'forced' : 'opened';
    }

}


interface Amortization {
    balance: number;
    interest: number;
    principal: number;
    extra: number;
}

interface Totals {
    interest: number;
    principal: number;
    extra: number;
    monthlyPayment: number;
    balance: number;
    table: Amortization[];
}
