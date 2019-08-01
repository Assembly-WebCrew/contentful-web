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
  showFilters: boolean;
  locationFilters = [];
  showPastEvents: boolean;
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
                filteredEvents: [],
                date: date
              };
              this.days.push(currentDay);
              prevDay = day;
            }
            currentDay.events.push(x);
            if (x.categories && x.categories.length)
              this.filters.push(...x.categories.map(c => c && c.toLowerCase()).filter(c => c));
            if (x.flags && x.flags.length)
              this.filters.push(...x.flags.map(f => f && f.toLowerCase()).filter(f => f));
            this.filters = Array.from(new Set(this.filters).values());
            if (x.location_key) {
              this.locationFilters.push(x.location_key);
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

  onFilterToggle(filter) {
    filter.active = !filter.active;

    this.filterEvents();
  }

  onShowPastEventsToggle() {
    this.showPastEvents = !this.showPastEvents;
    this.filterEvents();
  }

  onShowFiltersToggle() {
    this.showFilters = !this.showFilters;
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

    const canShow = (event) => this.showPastEvents
      || Date.now() < new Date(((event.end_time || event.start_time) + '').replace(/([\+-][0-9]{2})([0-9]{2})$/, '$1:$2')).getTime();

    const hasLocation = (event) => !activeLocations.length || activeLocations.length && activeLocations.some(f => {
      return (event.location_key || '').toLowerCase() === f.value;
    });
    const hasFilter = (event) => !active.length || active.length && active.some(f => {
      return event.categories.map(c => c && c.toLowerCase()).includes(f.value)
        || event.flags.map(c => c && c.toLowerCase()).includes(f.value);
    });

    this.days.forEach(day => {
      day.filteredEvents = day.events.filter(event => canShow(event)
        && ((!active.length && !activeLocations.length) || hasFilter(event) && hasLocation(event)));
    });
    this.noEvents = this.days.every(d => d.filteredEvents.length === 0);
  }
}
