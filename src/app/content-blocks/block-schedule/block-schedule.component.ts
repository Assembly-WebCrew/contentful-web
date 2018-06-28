import { Component, OnInit } from '@angular/core';
import { ScheduleService, Schedule } from '../services/schedule.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'asm-block-schedule',
  templateUrl: './block-schedule.component.html',
  styleUrls: ['./block-schedule.component.scss'],
})
export class BlockScheduleComponent implements OnInit {
  static blockName = 'BlockSchedule';

  content: any = {};
  days = {
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
  schedule: any = {};
  events = [];
  loading: boolean;
  errorMessage: string;


  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.loading = true;
    // const scheduleUrl = 'https://www.assembly.org/media/uploads/schedule/summer17/events.json';
    // const scheduleUrl = 'assets/summer17.json';

    // on server use content.scheduleSource
    this.scheduleService
      .getJSON(this.content.scheduleSource)
      .subscribe((data: Schedule) => {
        this.schedule = {
          locations: data.locations,
          events: data.events,
        };
        this.events = this.schedule.events;
        this.loading = false;
        if (this.events) {
          this.events.forEach(x => {
            switch (new Date(x.start_time).getDay()) {
              case 4:
                this.days.thursday.push(x);
                break;
              case 5:
                this.days.friday.push(x);
                break;
              case 6:
                this.days.saturday.push(x);
                break;
              case 0:
                this.days.sunday.push(x);
                break;
            }
          });
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.loading = false;
            this.errorMessage = 'There is a problem loading schedule. (Client-side error occurred)';
            console.error(this.errorMessage, err);
          } else {
            this.loading = false;
            this.errorMessage = 'There is a problem loading schedule. (Server-side error occurred)';
            console.error(this.errorMessage, err);
          }
        });
  }
}
