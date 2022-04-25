import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  getEvents() {
    return this.http.get(`${environment.apiUrl}/PlannerApp/${this.authService.currentUserValue?.uid}.json`)
  }

  addEvent(value: any) {
    return this.http.post(`${environment.apiUrl}/PlannerApp/${this.authService.currentUserValue?.uid}.json`, value);
  }

  removeEvent(id: any) {
    this.http.delete(`${environment.apiUrl}/PlannerApp/${this.authService.currentUserValue?.uid}/${id}.json`).subscribe();
  }
}
