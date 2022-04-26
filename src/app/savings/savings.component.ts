import { Component, OnInit } from '@angular/core';
import { SavingsService } from 'src/app/services/savings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {

  constructor(private savingsService: SavingsService) { }

  expensesForm = new FormGroup({
    expName: new FormControl(null, Validators.required),
    expAmount: new FormControl(null, Validators.required)
  })
  expenses: any = {};
  totalExpenses = 0;
  revenue: any = {};
  totalRevenue = 0;
  savings = 0;

  calculateExpenses() {
    let amount;
    this.totalExpenses = 0;
    for (const key of Object.keys(this.expenses!)) {
      amount = Number(this.expenses![key].expAmount);
      if (!isNaN(amount)) this.totalExpenses += amount;
    }
  }
  getExpenses() {
    this.savingsService.getExpenses().subscribe((resp: any) => {
      this.expenses = resp;
      this.calculateExpenses();     
      this.calculateSavings();
    })
  }

  calculateRevenue() {
    let amount;
    this.totalRevenue = 0;
    for (const key of Object.keys(this.revenue!)) {
      amount = Number(this.revenue![key].revAmount);
      if (!isNaN(amount)) this.totalRevenue += amount;
    }
  }

  calculateSavings() {
    this.savings = this.totalRevenue - this.totalExpenses;
  }

  getRevenue() {
    this.savingsService.getRevenue().subscribe((resp: any) => {
      this.revenue = resp;
      console.log(this.revenue)
      this.calculateRevenue();
      this.calculateSavings();
    })
  }



  ngOnInit(): void {
    this.getExpenses();
    this.getRevenue();
    this.calculateSavings();
  }

}
