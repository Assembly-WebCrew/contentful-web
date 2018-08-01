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
  filters = [];
  locationFilters = [];
  loading: boolean;
  noEvents: boolean;
  errorMessage: string;
  subscriptions = [];
  weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.loading = true;
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
            const date = new Date((x.start_time + '').replace(/([\+-][0-9]{2})([0-9]{2})$/, '$1:$2'));
            const day = date.getDay();
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
            if (x.categories && x.categories.length)
              this.filters.push(...x.categories);
            if (x.flags && x.flags.length)
              this.filters.push(...x.flags);
            this.filters = Array.from(new Set(this.filters).values());
            this.locationFilters.push(x.location_key);
            this.locationFilters = Array.from(new Set(this.locationFilters).values());
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

  onFilterToggle(filter) {
    filter.active = !filter.active;

    this.filterEvents();
  }

  parseFilters() {
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
    this.locationFilters = this.locationFilters.map(location => {
      let active = [];
      if (this.content.location) {
        active = this.content.location.replace(/,\s+/g, ',').toLowerCase().split(',');
      }
      return {
        title: this.locations[location].name,
        value: location,
        active: active.length && active.includes(location.toLowerCase())
      };
    });
  }

  filterEvents() {
    const active = this.filters.filter(f => f.active);
    const activeLocations = this.locationFilters.filter(l => l.active);

    const hasLocation = (event) => !activeLocations.length || activeLocations.length && activeLocations.some(f => {
      return event.location_key.toLowerCase() === f.value;
    });
    const hasFilter = (event) => !active.length || active.length && active.some(f => {
      return event.categories.includes(f.value) || event.flags.includes(f.value);
    });

    this.days.forEach(day => {
      day.filteredEvents = day.events.filter(event => (!active.length && !activeLocations.length)
        || hasFilter(event) && hasLocation(event));
    });
    this.noEvents = this.days.every(d => d.filteredEvents.length === 0);
  }
}
