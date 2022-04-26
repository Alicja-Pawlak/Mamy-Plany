import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  constructor(private eventService: EventsService, private router: Router) { }

  calendarForm = new FormGroup({
    eventName: new FormControl(null, Validators.required),
    eventDuration: new FormControl(null, Validators.required),
    eventDate: new FormControl(null, Validators.required),
  })

  submitEvent(value: any) {
    if (this.calendarForm.valid) {
      this.eventService.addEvent(value).subscribe(resp => {
        this.router.navigate(["/calendar"]);
      })
    }
  }

  ngOnInit(): void {
  }

}
