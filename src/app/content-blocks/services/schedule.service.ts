import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Schedule } from '../../core/interfaces/schedule.interface';
import { Observable } from 'rxjs';
import { ScheduleEvent } from '../../core/models/schedule-event.model';

@Injectable()
export class ScheduleService {

  constructor(
    private http: HttpClient) { }

  getJSON(url: string): Observable<Schedule> {
    return this.http.get<Schedule>(url);
  }

  getCategoryIcon(category: string): string {
    let icon = '';
    if (category && category.length) {
      const y = category.toString().toLowerCase();
      if (y === 'game') {
        icon = 'fa-gamepad';
      } else if (y === 'streamcorner') {
        icon = 'fa-play-circle-o';
      } else if (y === 'compo' || y === 'compostudio') {
        icon = 'fa-cog';
      } else if ( y === 'sports') {
        icon = 'fa-futbol-o';
      } else if ( y === 'ceremony') {
        icon = 'fa-trophy';
      }
    }
    return icon;
  }

  fixTimes(scheduleEvent: ScheduleEvent): void {
    scheduleEvent.start_time = this.fixTime(scheduleEvent.start_time);
    scheduleEvent.end_time = this.fixTime(scheduleEvent.end_time);
    scheduleEvent.original_start_time = this.fixTime(scheduleEvent.original_start_time);
  }

  fixTime(time: Date): Date {
    return time ? new Date(time.toString().replace(/([\+-][0-9]{2})([0-9]{2})$/, '$1:$2')) : undefined;
  }
}
