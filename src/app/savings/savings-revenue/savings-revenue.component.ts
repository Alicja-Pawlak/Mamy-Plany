import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SavingsService } from 'src/app/services/savings.service';

@Component({
  selector: 'app-savings-revenue',
  templateUrl: './savings-revenue.component.html',
  styleUrls: ['./savings-revenue.component.scss']
})
export class SavingsRevenueComponent implements OnInit {

  constructor(private savingsService: SavingsService, private router: Router) { }

  revenue: any = {};
  totalRevenue = 0;
  revenueAmountError = false;
  revenueNameError = false;

  revenueArray: any[] = [];

  revenueForm = new FormGroup({
    revName: new FormControl(null, Validators.required),
    revAmount: new FormControl(null, Validators.required)
  })

  addRevenue(value: any) {
    if (value.revAmount > 0) {
      if (value.revName != null && value.revName != 0 && value.revName != "") {
        console.log(value.revName.length);
        if (this.revenueForm.valid) {
          this.savingsService.addRevenue(value);
          this.router.navigate(["/savings"]);
        }
        this.revenueAmountError = false;
        this.revenueNameError = false;
      }
      else {
        this.revenueNameError = true;
      }
    }
    else {
      this.revenueAmountError = true;
    }
  }
  
  getRevenue() {
    this.savingsService.getRevenue().subscribe((resp: any) => {
      this.revenue = resp;
      console.log(this.revenue)
      if (this.revenue) {
        this.populateRevenue();
        this.calculateRevenue();
      }
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

  ngOnInit(): void {
    this.getRevenue();
  }

  removeRevenue(id: any) {
    this.savingsService.removeRevenue(id);
  }

  populateRevenue() : void {
    this.revenueArray = [];
    for (const rev of Object.keys(this.revenue) ) {
      this.revenueArray.push({
          revName: this.revenue[rev].revName,
          revAmount:  this.revenue[rev].revAmount,
          id: rev
        },
      )
      this.revenueArray = this.revenueArray.filter(x=>x.revName != undefined)
    }
  }

}
