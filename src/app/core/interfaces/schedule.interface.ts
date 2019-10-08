import { ScheduleEvent } from '../models/schedule-event.model';

export class Schedule {
  locations: {[key: string]: ScheduleEvent};
  events: ScheduleEvent[];
}

export interface ScheduleEntity {
  description_fi?: string;
  description?: string;
  key?: string;
  name_fi?: string;
  name?: string;
  schedule?: string;
  url?: string;
}

// in practise same as ScheduleEntity
// but keeping it separate for code documentation
// and for possible future additions
// tslint:disable-next-line: no-empty-interface
export interface ScheduleLocation extends ScheduleEntity {
}

export interface ScheduleDay {
  date?: Date;
  events?: any[];
  filteredEvents?: any[];
  title?: string;
}

export interface ScheduleFilter {
  active?: boolean;
  title?: string;
  value?: any;
}

export interface ScheduleCategoryFilter extends ScheduleFilter {
  icon?: string;
}
