export class Schedule {
  locations: ScheduleLocation[];
  events: ScheduleEvent[];
}

export interface ScheduleEntity {
  description_fi: string;
  description: string;
  key: string;
  name_fi?: string;
  name: string;
  schedule: string;
  url?: string;
}

export interface ScheduleEvent extends ScheduleEntity {
  description_fi: string;
  description: string;
  key: string;
  name_fi?: string;
  name: string;
  schedule: string;
  url?: string;
  canceled: boolean;
  cancellation_reason: string;
  categories?: string[];
  end_time?: Date;
  flags?: string[];
  hidden: boolean;
  location_key?: string;
  order: number;
  original_start_time?: Date;
  start_time?: Date;
}

// in practise same as ScheduleEntity
// but keeping it separate for code documentation
// and for possible future additions
export interface ScheduleLocation extends ScheduleEntity {
  description_fi: string;
  description: string;
  key: string;
  name_fi?: string;
  name: string;
  schedule: string;
  url?: string;
}
