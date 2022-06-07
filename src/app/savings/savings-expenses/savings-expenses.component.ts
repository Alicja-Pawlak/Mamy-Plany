import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SavingsService } from 'src/app/services/savings.service';

@Component({
  selector: 'app-savings-expenses',
  templateUrl: './savings-expenses.component.html',
  styleUrls: ['./savings-expenses.component.scss']
})
export class SavingsExpensesComponent implements OnInit {

  constructor(private savingsService: SavingsService, private router: Router) { }

  expenses: any = {};
  totalExpenses = 0;
  expensesAmountError = false;
  expensesNameError = false;

  expensesArray: any[] = [];

  categoriesArray: any[] = ['Jedzenie', 'Mieszkanie', 'Zdrowie, higiena i chemia', 'Ubranie', 'Relaks', 'Transport', 'Inne wydatki'];

  myData: any[];

  myType = ChartType.PieChart;
  myTitle = 'Szczegóły wydatków';
  myColumns = ['Kategoria', 'Przychody'];

  expensesForm = new FormGroup({
    expName: new FormControl(null, Validators.required),
    expAmount: new FormControl(null, Validators.required),
    expCategory: new FormControl(this.categoriesArray[0])
  })

  addExpenses(value: any) {
    if (value.expAmount > 0) {
      if (value.expName != null && value.expName != false && value.expName != "") {
        console.log(value.expName.length);
        if (this.expensesForm.valid) {
          this.savingsService.addExpenses(value);
          this.router.navigate(["/savings"]);
        }
        this.expensesAmountError = false;
        this.expensesNameError = false;
      }
      else {
        this.expensesNameError = true;
      }
    }
    else {
      this.expensesAmountError = true;
    }
  }

  getExpenses() {
    this.savingsService.getExpenses().subscribe((resp: any) => {
      this.expenses = resp;
      if (this.expenses) {
        this.myData = [
          ['Jedzenie', 0], 
          ['Mieszkanie', 0],
          ['Zdrowie, higiena i chemia', 0],
          ['Relaks', 0],
          ['Transport', 0],
          ['Inne wydatki', 0]
        ];
        this.populateExpenses();
        this.calculateExpenses();
        
      }
    })
  }

  removeExpense(id: any) {
    this.savingsService.removeExpense(id);
  }

  calculateExpenses() {
    let amount: number;
    let category: String;
    let value: number;
    this.totalExpenses = 0;
    for (const key of Object.keys(this.expenses!)) {
      amount = Number(this.expenses![key].expAmount);
      if (!isNaN(amount)) this.totalExpenses += amount;
      
      category = String(this.expenses![key].expCategory)

      // calculate expenses for each category
      this.myData.forEach(element => {
          if(element[0] == category){
            value = Number(element[1]);
            value += amount;
            element[1] = value;
          }
      });

    }
  }

  ngOnInit(): void {
    this.getExpenses();
  }

  populateExpenses() : void {
    this.expensesArray = [];
    for (const expense of Object.keys(this.expenses) ) {
      this.expensesArray.push({
          expName: this.expenses[expense].expName,
          expCategory: this.expenses[expense].expCategory,
          expAmount:  this.expenses[expense].expAmount,
          id: expense
        },
      )
      // Filtrowanie książek
      this.expensesArray = this.expensesArray.filter(x=>x.expName != undefined)
    }
  }

}

export enum ChartType {
  PieChart = 'PieChart'
}

