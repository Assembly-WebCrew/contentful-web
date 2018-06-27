import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable()
export class ScheduleService {

  constructor(
    private http: HttpClient) { }

  getJSON(url) {
    return this.http.get<Schedule>(url);
  }
}
