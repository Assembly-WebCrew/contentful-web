import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Schedule } from '../../core/interfaces/schedule.interface';

export class Location {
  name: string;
}

@Injectable()
export class ScheduleService {

  constructor(
    private http: HttpClient) { }

  getJSON(url: string) {
    return this.http.get<Schedule>(url);
  }

  getCategoryIcon(category) {
    let icon = '';
    if (category) {
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
}
