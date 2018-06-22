import { Component, OnInit } from '@angular/core';
import { ScheduleService, Schedule } from '../services/schedule.service';

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
  times = [];
  schedule: any = {};
  // loading = true;
  events = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.times = ['12:00', '13:00'];

    this.scheduleService
      .getJSON('assets/winter18.json')
      .subscribe((data: Schedule) => {
        this.schedule = {
          locations: data.locations,
          events: data.events,
        };
        this.events = this.schedule.events;
        // this.loading = false;
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
      });
  }

  // }` }).then(response => {
  //   response.data.sponsors.forEach(sponsor => {
  //     if (sponsor.isMainSponsor) {
  //       this.mainPartners.push(sponsor);
  //     } else {
  //       this.otherPartners.push(sponsor);
  //     }
  //   });

  // eventsToDays(events) {
  //   let i = 0;
  //   while (events[i]) {

  //     i++;
  //   }
  // }

  getDayOfWeek(time) {
    const day = new Date(time).getDay();
    return day;
  }

  // checkDay(time, day) {
  //   // const date = new Date();
  //   const time_temp = new Date(time).getDay();
  //   // const day_temp = new Date(day).getDay();
  //   const isSame = (time_temp === day);
  //   console.log(isSame, time_temp, day);
  //   return isSame;
  // }
}
