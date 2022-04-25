import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  private expenses: any = {};
  private expenses$ = new BehaviorSubject<any[]>([]);

  private revenue: any = {};
  private revenue$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.http.get(`${environment.apiUrl}/Savings/Expenses/${this.authService.currentUserValue?.uid}.json`).subscribe(exp => {
      exp ? this.expenses = exp : {};
      this.expenses$.next(this.expenses);
    });
    this.http.get(`${environment.apiUrl}/Savings/Revenue/${this.authService.currentUserValue?.uid}.json`).subscribe(rev => {
      rev ? this.revenue = rev : {};
      this.revenue$.next(this.revenue);
    })
  }

  addExpenses(value: any): void{
    this.http.post(`${environment.apiUrl}/Savings/Expenses/${this.authService.currentUserValue?.uid}.json`, value).subscribe((resExp: any) => {
      let key = resExp.name;
      this.expenses[key] = {
        expAmount: value.expAmount,
        expName: value.expName
      };
      this.expenses$.next(this.expenses);
      
    })
  }

  removeExpense(id: any) {
    this.http.delete(`${environment.apiUrl}/Savings/Expenses/${this.authService.currentUserValue?.uid}/${id}.json`).subscribe((resp: any) => {
      delete this.expenses[id];
      this.expenses$.next(this.expenses);
    })
  }

  addRevenue(value: any): void {
    this.http.post(`${environment.apiUrl}/Savings/Revenue/${this.authService.currentUserValue?.uid}.json`, value).subscribe((resRev: any) => {
      let key = resRev.name;
      this.revenue[key] = {
        revAmount: value.revAmount,
        revName: value.revName
      };
      this.revenue$.next(this.revenue);
    })
  }

  removeRevenue(id: any) {
    this.http.delete(`${environment.apiUrl}/Savings/Revenue/${this.authService.currentUserValue?.uid}/${id}.json`).subscribe((resp: any) => {
      delete this.revenue[id];
      this.revenue$.next(this.revenue);
    })
  }

  getExpenses(): Observable<any> {
    return this.expenses$.asObservable();
  }

  getRevenue(): Observable<any> {
    return this.revenue$.asObservable();
  }
}
