export class Schedule {
  locations: ScheduleLocation[];
  events: IScheduleEvent[];
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

export interface IScheduleEvent extends ScheduleEntity {
  canceled?: boolean;
  cancellation_reason?: string;
  categories?: string[];
  duration?: string;
  end_time?: Date;
  flags?: string[];
  hidden?: boolean;
  isMajor?: boolean;
  isRescheduled?: boolean;
  location_key?: string;
  order?: number;
  original_start_time?: Date;
  start_time?: Date;
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
