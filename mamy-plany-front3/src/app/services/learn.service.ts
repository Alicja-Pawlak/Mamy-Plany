import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LearnService {

  private learn: any = {};
  private learn$ = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient, private authService: AuthService) { 
    this.http.get(`${environment.apiUrl}/Learn/${this.authService.currentUserValue?.uid}.json`).subscribe(learn => {
      learn ? this.learn = learn : {};
      this.learn$.next(this.learn);
    })
  }
  createLearn(learn: any): void {
    this.http.post(`${environment.apiUrl}/Learn/${this.authService.currentUserValue?.uid}.json`, learn).subscribe((resLearn: any) => {
      let key = resLearn.name;
      this.learn[key] = {
        endDate: learn.endDate,
        subject: learn.subject,
        topic: learn.topic
      };
      this.learn$.next(this.learn);
    });
  }

  removeLearn(id: any) {
    this.http.delete(`${environment.apiUrl}/Learn/${this.authService.currentUserValue?.uid}/${id}.json`).subscribe((resp: any) => {
      delete this.learn[id];
      this.learn$.next(this.learn);
    })
  }

  getLearn() {
    return this.learn$.asObservable();
  }
}
