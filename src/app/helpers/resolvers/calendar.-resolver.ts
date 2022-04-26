import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { EventsService } from "src/app/services/events.service";

@Injectable({
    providedIn: 'root'
  })
  export class CalendarResolver implements Resolve<any> {
  
    constructor(private eventService : EventsService) {}
  
    resolve(): Observable<any> {
      return this.eventService.getEvents().pipe(
          catchError(err => {
              return of ("No calendar data");
          })
      )
  
      }
  
    }