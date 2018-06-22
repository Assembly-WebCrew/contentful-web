import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'asm-block-schedule-event',
  templateUrl: './block-schedule-event.component.html',
  styleUrls: ['./block-schedule-event.component.scss'],
})
export class BlockScheduleEventComponent implements OnInit {
  static blockName = 'BlockScheduleEvent';

  @Input() event;
  opened: Boolean = false;
  id: string;

  ngOnInit() {
    this.event.duration = this.getDuration(
      this.event.start_time,
      this.event.end_time
    );
    this.event.isRescheduled =
    this.event.start_time !== this.event.original_start_time || false;
    this.event.isMajor = this.event.flags.includes('major');
    this.event.icon = this.getCategoryIcon();
  }

  toggle() {
    this.opened = !this.opened;
  }

  getDuration(start: Date, end: Date) {
    const sec = 1000;
    const min = 60 * sec;
    const hour = 60 * min;
    const day = 24 * hour;
    let duration = '';

    const distance = new Date(end).getTime() - new Date(start).getTime();
    // how many days
    const days = Math.floor(distance / hour);
    if (days !== 0) {
      duration = days + ' days';
    }
    // how many hours after days
    const hours = Math.floor((distance % day) / hour);
    if (hours !== 0) {
      if (days !== 0) duration = duration + ' ';
      duration = duration + hours + ' h';
    }
    // how many minutes after hours
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

  getCategoryIcon() {
  let icon = '';
  if (this.event.name.includes('doors' || 'entrance')) {
    return icon = 'fa-home';
  } else {
    this.event.categories.map ( x => {

      const y = x.toString().toLowerCase();
      console.log(y);
      if (y === 'game') {
        console.log('GAME TIME');
        return icon = 'fa-gamepad';
      } else if (y === 'streamcorner') {
        return icon = 'fa-play-circle-o';
      } else if ((y === 'Demoscene'))  {
        return icon = 'fa-image';
      } else if (this.event.name.includes('doors') || this.event.name.includes('entrance') ) {
        return icon = 'fa-home';
      }
    });
  }
    return icon;
  }

  hasCategory(cat) {
    return;
  }
}
