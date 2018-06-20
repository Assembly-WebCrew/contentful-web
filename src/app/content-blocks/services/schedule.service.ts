import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export interface Schedule {
  locations: Object;
  events: Array<number>;
}

export interface ScheduleEvent {
  categories?: string[];
  end_time?: Date;
  flags?: string[];
  key: string;
  location_key?: string;
  name_fi?: string;
  name?: string;
  original_start_time?: Date;
  start_time?: Date;
  url?: string;
}

export interface ScheduleLocation {
  name: string;
  name_fi?: string;
  url?: string;
}

export class Location {
  name: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class ScheduleService {

  scheduleUrl: string;
  datajson: any;
   events: any;
   locations: any;
  event: any;
  // schedule: any;
  localSchedule = 'assets/winter18.json';
  loading = false;
  data: Object;

  constructor(
    private http: HttpClient) { }

  getSchedule(url) {
    let schedule: any;
    this.http.get<Schedule>(url)
    .subscribe((data: Schedule) => {
        schedule = {
          locations: data.locations,
          events:  data.events
        };
        this.loading = false;
        console.log('getSchedule');
        console.log(schedule);
        console.log(schedule.events);
        console.log(schedule.locations);
      return schedule.events;
    });
    console.log(schedule);
    return schedule;
  }

  // getEvents() {
  //   this.http.get<Schedule>(this.scheduleUrl).subscribe(data => {
  //     // console.log(data);
  //     console.log('locations: ' + data.locations);
  //     console.log('events: ' + data.events);
  //   },
  //   (err: HttpErrorResponse) => {
  //     if (err.error instanceof Error) {
  //       console.log('Client-side error occurred');
  //     } else {
  //       console.log('Server-side error occurred');
  //     }
  //   }
  // );
  // }

  getJSON(url) {
    return this.http.get<Schedule>(url);
  }


}




