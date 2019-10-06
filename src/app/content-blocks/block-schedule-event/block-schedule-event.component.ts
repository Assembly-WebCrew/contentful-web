import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleLocation } from '../../core/interfaces/schedule.interface';
import { ScheduleEvent } from '../../core/models/schedule-event.model';

@Component({
  selector: 'asm-block-schedule-event',
  templateUrl: './block-schedule-event.component.html',
  styleUrls: ['./block-schedule-event.component.scss'],
})
export class BlockScheduleEventComponent implements OnInit {
  static blockName = 'BlockScheduleEvent';

  @Input() event: ScheduleEvent;
  @Input() locations: ScheduleLocation[];
  opened: Boolean = false;
  id: string;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    if (!this.locations)
      this.locations = [];
    if (!this.event)
      this.event = new ScheduleEvent();

    this.event.fixTimes();

    this.event.duration = this.getDuration(
      this.event.start_time,
      this.event.end_time
    );
    this.event.isRescheduled = this.event.start_time !== this.event.original_start_time;
    this.event.isMajor = this.event.flags && this.event.flags.includes('major');
  }

  toggle(): void {
    this.opened = !this.opened;
  }

  getDuration(start: Date, end: Date): string {
    if (!start && !end)
      return '';

    if (!end) {
      console.warn(`No end time defined for event ${this.event.name}`);
      end = start;
    }

    const sizes = {
      min: 60000,
      hour: 3600000,
      day: 86400000
    };
    const duration = {
      min: 0,
      hour: 0,
      day: 0
    };
    const startTime = new Date(start);
    const endTime = new Date(end);

    const distance = endTime.getTime() - startTime.getTime();
    duration.day = Math.floor(distance / sizes.day);
    duration.hour = Math.floor((distance % sizes.day) / sizes.hour);
    duration.min = Math.floor((distance % sizes.hour) / sizes.min);

    let msg = '';
    const locale = 'en'; // This is will be changed if we decide to do localization at some point;
    if (startTime.getDay() !== endTime.getDay()) {
      msg = `${formatDate(startTime, 'E d.M. H:mm', locale)} - ${formatDate(endTime, 'E d.M. H:mm', locale)}`;
    } else if (start === end) {
      msg = formatDate(startTime, 'H:mm', locale);
    } else {
      msg = `${formatDate(startTime, 'H:mm', locale)} - ${formatDate(endTime, 'H:mm', locale)}`;
    }

    let dur = duration.day !== 0 ? duration.day + ' days' : '';
    dur = duration.hour !== 0 ? dur + ' ' + duration.hour + ' h' : dur;
    dur = duration.min !== 0 ? dur + ' ' + duration.min + ' min' : dur;
    dur = dur.trim();

    msg += dur !== '' ? ' (' + dur + ')' : '';

    return msg;
  }

  getCategoryIcon(): string {
    let icon = '';
    if (this.event.categories) {
      this.event.categories.some((category: string) => {
        icon = this.scheduleService.getCategoryIcon(category);
        return icon;
      });
    }
    return icon;
  }
}
