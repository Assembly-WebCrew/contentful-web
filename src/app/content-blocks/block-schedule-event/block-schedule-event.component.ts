import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'asm-block-schedule-event',
  templateUrl: './block-schedule-event.component.html',
  styleUrls: ['./block-schedule-event.component.scss']
})
export class BlockScheduleEventComponent implements OnInit {
  static blockName = 'BlockScheduleEvent';

  @Input() event;
  opened: Boolean = false;
  id: string;

  ngOnInit() {
  }

  toggle() {
      this.opened = !this.opened;
  }

  getDuration(start, end) {
    const sec = 1000;
    const min = 60 * sec;
    const hour = 60 * min;
    const day = 24 * hour;
    let duration = '';

    const distance  = new Date(end).getTime() - new Date(start).getTime();
    const days = Math.floor(distance / hour);
    if (days !== 0) {
      duration = days + ' days';
    }
    const hours = Math.floor((distance % day) / hour);
    if (hours !== 0) {
      if (days !== 0) duration = duration + ' ';
      duration = duration + hours + ' h';
    }
    const minutes = Math.floor((distance % hour) / min);
    if (minutes !== 0) {
      if (hours !== 0) {
        duration = duration + ' ';
      } else if (hours !== 0 && minutes === 0) {
        duration = duration + ' ';
      }
      duration = duration + minutes + ' min';
    }
    if (duration !== '') {
      return '(' + duration + ')';
    } else {
      return '(0 min)';
    }
  }

}
