export class Schedule {
  locations: Object;
  events: number[];
}

export class ScheduleEntity {
  name: string;
  name_fi?: string;
  url?: string;
}

export class ScheduleEvent extends ScheduleEntity {
  categories?: string[];
  end_time?: Date;
  flags?: string[];
  key: string;
  location_key?: string;
  original_start_time?: Date;
  start_time?: Date;
}

export class ScheduleLocation extends ScheduleEntity {
}
