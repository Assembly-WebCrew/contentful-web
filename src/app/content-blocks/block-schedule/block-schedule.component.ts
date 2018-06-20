import { Component, OnInit } from '@angular/core';
import { ScheduleService, Schedule } from '../services/schedule.service';

@Component({
  selector: 'asm-block-schedule',
  templateUrl: './block-schedule.component.html',
  styleUrls: ['./block-schedule.component.scss']
})

export class BlockScheduleComponent implements OnInit {
  static blockName = 'BlockSchedule';

  content: any = {};
  days = [];
  // calEvents = {};
  times = [];
  schedule: any = {};
  loading = true;
  events = [];

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.days = ['Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.times = ['12:00', '13:00'];

    this.scheduleService.getJSON('assets/winter18.json')
      .subscribe((data: Schedule) => {
      this.schedule = {
        locations: data.locations,
        events:  data.events
      };
      this.loading = false;
      console.log('getSchedule');
      console.log(this.schedule);
      this.events = this.schedule.events;
      console.log(this.schedule.events);
      console.log(this.schedule.locations);
    });

    console.log(this.events);
    console.log(this.schedule);
  }



  eventsToDays(events) {
    let i = 0;
    while (events[i]) {

      i++;
    }
  }

  getDayOfWeek(time) {
    const day = new Date(time).getDay();
    return day;
  }

  checkDay(time, day) {
    // const date = new Date();
    const time_temp = new Date(time).getDay();
    // const day_temp = new Date(day).getDay();
    const isSame = (time_temp === day);
    console.log(isSame, time_temp, day);
    return isSame;
  }
}
