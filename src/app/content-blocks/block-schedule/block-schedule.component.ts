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
  days = [];
  events = [];
  locations = {};
  loading: boolean;
  errorMessage: string;
  subscriptions = [];
  weekdays: string[] = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // scheduleSource = 'assets/winter18.json';
  // const scheduleUrl = 'https://www.assembly.org/media/uploads/schedule/summer17/events.json';


  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.loading = true;

    // on server use content.scheduleSource
    this.scheduleService
      .getJSON(this.content.scheduleSource)
      .subscribe((data: Schedule) => {
        this.locations = data.locations;
        this.events = data.events;
        this.loading = false;
        if (this.events) {
          let prevDay;
          let currentDay;
          this.events.forEach(x => {
            let date = new Date((x.start_time + "").replace(/([\+-][0-9]{2})([0-9]{2})$/, "$1:$2"));
            let day = date.getDay();
            if (day !== prevDay) {
              currentDay = {
                title: this.weekdays[day],
                events: [],
                date: date
              };
              this.days.push(currentDay);
              prevDay = day;
            }
            currentDay.events.push(x);
          });
        }
      },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = 'There is a problem loading schedule.';
          console.error(this.errorMessage, err);
        });
  }
}
