
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {
  addHours,
  isSameDay,
  isSameMonth,
  parseISO
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { EventsService } from '../services/events.service';
import { ActivatedRoute } from '@angular/router';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  view: CalendarView = CalendarView.Month;

  daysInWeek = 7;

  menu: HTMLElement | null = null;

  wrap: HTMLElement | null = null;

  private destroy$ = new Subject();

  showMenu: boolean = true;

  isToday: boolean = true;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  eventList: any = {};

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(
              private breakpointObserver: BreakpointObserver,
              private cd: ChangeDetectorRef,
              private eventService: EventsService,
              private route: ActivatedRoute) {}

  setDayView(view : boolean){
    this.isToday = view;
  }

 removeEvent(id: any) {
   console.log(id)
   this.eventService.removeEvent(id);
 }

  populateEvents() : void {
    for (const event of Object.keys(this.eventList) ) {
      this.events.push({
          start: parseISO(this.eventList[event].eventDate) ,
          end:  addHours(parseISO(this.eventList[event].eventDate), this.eventList[event].eventDuration),
          title: this.eventList[event].eventName,             
          color: colors.blue,
          allDay: false,
        },
      )
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.wrap = document.getElementById("button-wrap");
    this.route.data.subscribe((resp: any) => {
    this.eventList = resp.events;
    if (this.eventList) {
      this.populateEvents();
    }
    })
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 700px)',
        view: CalendarView.Day,
        wrap: "column",
        menu: false,
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 900px)',
        view: CalendarView.Week,
        menu: true,
        wrap: "row",
        daysInWeek: 4,
      },
      large: {
        breakpoint: '(min-width: 950px)',
        view: CalendarView.Month,
        wrap: "row",
        menu: true,
        daysInWeek: 7,
      },
    }
    
    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          console.log(foundBreakpoint)
          this.daysInWeek = foundBreakpoint.daysInWeek;
          this.showMenu = foundBreakpoint.menu;
          this.wrap!.style.flexDirection = foundBreakpoint.wrap;
          this.view = foundBreakpoint.view;
        } 
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    //this.destroy$.next();
  }

}
