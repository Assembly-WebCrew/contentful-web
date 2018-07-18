import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'asm-block-schedule-event',
  templateUrl: './block-schedule-event.component.html',
  styleUrls: ['./block-schedule-event.component.scss'],
})
export class BlockScheduleEventComponent implements OnInit {
  static blockName = 'BlockScheduleEvent';

  @Input() event;
  @Input() locations;
  opened: Boolean = false;
  id: string;

  constructor(private scheduleService: ScheduleService, private datePipe: DatePipe) { }

  ngOnInit() {
    if (!this.locations)
      this.locations = {};
    if (!this.event)
      this.event = {};
    if (this.event.start_time)
      this.event.start_time = this.event.start_time.replace(/([\+-][0-9]{2})([0-9]{2})$/, '$1:$2');
    if (this.event.end_time)
      this.event.end_time = this.event.end_time.replace(/([\+-][0-9]{2})([0-9]{2})$/, '$1:$2');
    if (this.event.original_start_time)
      this.event.original_start_time = this.event.original_start_time.replace(/([\+-][0-9]{2})([0-9]{2})$/, '$1:$2');
    this.event.duration = this.getDuration(
      this.event.start_time,
      this.event.end_time
    );
    this.event.isRescheduled = this.event.start_time !== this.event.original_start_time;
    this.event.isMajor = this.event.flags && this.event.flags.includes('major');
  }

  toggle() {
    this.opened = !this.opened;
  }

  getDuration(start: Date, end: Date) {

    if (!start && !end)
      return '';

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

    // TODO: change to use formatDate after Angular 6 upgrade
    let msg = '';
    if (startTime.getDay() !== endTime.getDay()) {
      msg = this.datePipe.transform(startTime, 'E d.M. H:mm') + ' – ' + this.datePipe.transform(endTime, 'E d.M. H:mm');
    } else if (start === end) {
      msg = this.datePipe.transform(startTime, 'H:mm');
    } else {
      msg = this.datePipe.transform(startTime, 'H:mm') + ' – ' + this.datePipe.transform(endTime, 'H:mm');
    }

    let dur = duration.day !== 0 ? duration.day + ' days' : '';
    dur = duration.hour !== 0 ? dur + ' ' + duration.hour + ' h' : dur;
    dur = duration.min !== 0 ? dur + ' ' + duration.min + ' min' : dur;
    dur = dur.trim();

    msg += dur !== '' ? ' (' + dur + ')' : '';

    return msg;
  }

  getCategoryIcon() {
    let icon = '';
    if (this.event.categories) {
      this.event.categories.some(category => {
        icon = this.scheduleService.getCategoryIcon(category);
        return icon;
      });
    }
    return icon;
  }
}
