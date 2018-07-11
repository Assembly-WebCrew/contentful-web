import { Component, OnInit, Input } from '@angular/core';

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

    const distance = new Date(end).getTime() - new Date(start).getTime();
    duration.day = Math.floor(distance / sizes.day);
    duration.hour = Math.floor((distance % sizes.day) / sizes.hour);
    duration.min = Math.floor((distance % sizes.hour) / sizes.min);

    let msg = duration.day !== 0 ? duration.day + ' days' : '';
    msg = duration.hour !== 0 ? msg + ' ' + duration.hour + ' h' : msg;
    msg = duration.min !== 0 ? msg + ' ' + duration.min + ' min' : msg;
    msg = msg.trim();

    msg = msg !== '' ? '(' + msg + ')' : '';

    return msg;
  }

  getCategoryIcon() {
    let icon = '';
      if (this.event.categories) {
        this.event.categories.some(category => {
          const y = category.toString().toLowerCase();
          if (y === 'game') {
            icon = 'fa-gamepad';
          } else if (y === 'streamcorner') {
            icon = 'fa-play-circle-o';
          } else if (y === 'compo' || y === 'compostudio') {
            icon = 'fa-cog';
          } else if ( y === 'sports') {
            icon = 'fa-futbol-o';
          } else if ( y === 'ceremony') {
            icon = 'fa-trophy';
          }
        });
      }
    return icon;
  }
}
