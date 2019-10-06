export class ScheduleEvent implements ScheduleEvent {
  canceled?: boolean;
  cancellation_reason?: string;
  categories?: string[];
  description_fi?: string;
  description?: string;
  duration?: string;
  end_time?: Date;
  flags?: string[];
  hidden?: boolean;
  isMajor?: boolean;
  isRescheduled?: boolean;
  key?: string;
  location_key?: string;
  name_fi?: string;
  name?: string;
  order?: number;
  original_start_time?: Date;
  schedule?: string;
  start_time?: Date;
  url?: string;

  constructor() {

  }

  fixTimes(): void {
    this.start_time = this.fixTime(this.start_time);
    this.end_time = this.fixTime(this.end_time);
    this.original_start_time = this.fixTime(this.original_start_time);
  }

  fixTime(time: Date): Date {
    return time ? new Date(time.toString().replace(/([\+-][0-9]{2})([0-9]{2})$/, '$1:$2')) : undefined;
  }
}
