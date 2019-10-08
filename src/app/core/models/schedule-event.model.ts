import { ScheduleEntity } from '../interfaces/schedule.interface';

export class ScheduleEvent implements ScheduleEntity {
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
  stream?: string;
  url?: string;
}
