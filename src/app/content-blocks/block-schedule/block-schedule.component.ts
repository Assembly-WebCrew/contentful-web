import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Schedule, ScheduleDay, ScheduleFilter, ScheduleLocation } from '../../core/interfaces/schedule.interface';
import { ScheduleEvent } from '../../core/models/schedule-event.model';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'asm-block-schedule',
  templateUrl: './block-schedule.component.html',
  styleUrls: ['./block-schedule.component.scss'],
})
export class BlockScheduleComponent implements OnInit {
  static blockName = 'BlockSchedule';

  content: any = {};
  days: ScheduleDay[] = [];
  events: ScheduleEvent[] = [];
  locations: {[key: string]: ScheduleLocation};
  filters = [];
  showFilters: boolean;
  locationFilters = [];
  showPastEvents: boolean;
  loading: boolean;
  noEvents: boolean;
  errorMessage: string;
  subscriptions = [];
  weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loading = true;
    this.scheduleService
      .getJSON(this.content.scheduleSource)
      .subscribe((data: Schedule) => {
        this.locations = data.locations;
        data.events.forEach((event: ScheduleEvent) => {
          this.events.push(event as ScheduleEvent);
        });
        this.loading = false;
        if (this.events) {
          let prevDayNumber: number;
          let currentDay: ScheduleDay;
          this.events.forEach((x: ScheduleEvent) => {
            const date: Date = this.scheduleService.fixTime(x.start_time);
            const dayNumber = date.getDay();
            if (dayNumber !== prevDayNumber) {
              currentDay = {
                title: this.weekdays[dayNumber],
                events: [],
                filteredEvents: [],
                date: date
              };
              this.days.push(currentDay);
              prevDayNumber = dayNumber;
            }
            currentDay.events.push(x);
            if (x.categories && x.categories.length)
              this.filters.push(...x.categories.map(c => c && c.toLowerCase()).filter(c => c));
            if (x.flags && x.flags.length)
              this.filters.push(...x.flags.map(f => f && f.toLowerCase()).filter(f => f));
            this.filters = Array.from(new Set(this.filters).values());
            if (x.location_key) {
              this.locationFilters.push({title: x.location_key});
              this.locationFilters = Array.from(new Set(this.locationFilters).values());
            } else {
              console.warn(`No location for event "${x.name}"`, x);
            }
          });
          this.parseFilters();
          this.filterEvents();
        }
      },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = 'There is a problem loading schedule.';
          console.error(this.errorMessage, err);
        });
  }

  onFilterToggle(filter: ScheduleFilter): void {
    filter.active = !filter.active;

    this.filterEvents();
  }

  onShowPastEventsToggle(): void {
    this.showPastEvents = !this.showPastEvents;
    this.filterEvents();
  }

  onShowFiltersToggle(): void {
    this.showFilters = !this.showFilters;
  }

  parseFilters(): void {
    this.filters = this.filters.map(filter => {
      if (filter) {
        let active = [];
        if (this.content.tag) {
          active = this.content.tag.replace(/,\s+/g, ',').toLowerCase().split(',');
        }
        return {
          title: filter,
          value: filter,
          icon: this.scheduleService.getCategoryIcon(filter),
          active: active.length && active.includes(filter.toLowerCase())
        };
      }
    }).sort((a, b) => (a.title + '').localeCompare((b.title + '')));
    this.locationFilters = this.locationFilters.map((location: string) => {
      let active = [];
      if (this.content.location) {
        active = this.content.location.replace(/,\s+/g, ',').toLowerCase().split(',');
      }
      return {
        title: this.locations[location] ? this.locations[location].name : '',
        value: location,
        active: active.length && active.includes(location.toLowerCase())
      };
    });
  }

  filterEvents(): void {
    const active = this.filters.filter(f => f.active);
    const activeLocations = this.locationFilters.filter(l => l.active);

    const canShow = (event: ScheduleEvent) => this.showPastEvents
      || Date.now() < this.scheduleService.fixTime(event.end_time || event.start_time).getTime();

    const hasLocation = (event: ScheduleEvent) => !activeLocations.length || activeLocations.length && activeLocations.some(f => {
      return (event.location_key || '').toLowerCase() === f.value;
    });
    const hasFilter = (event: ScheduleEvent) => !active.length || active.length && active.some(f => {
      return event.categories.map(c => c && c.toLowerCase()).includes(f.value)
        || event.flags.map(c => c && c.toLowerCase()).includes(f.value);
    });

    this.days.forEach((day: ScheduleDay) => {
      day.filteredEvents = day.events.filter(event => canShow(event)
        && ((!active.length && !activeLocations.length) || hasFilter(event) && hasLocation(event)));
    });
    this.noEvents = this.days.every(d => d.filteredEvents.length === 0);
  }
}
