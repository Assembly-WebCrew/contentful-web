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
    this.event.isRescheduled = this.event.start_time !== this.event.original_start_time;
    this.event.isMajor = this.event.flags.includes('major');
    this.event.icon = this.getCategoryIcon();
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
    duration.day = Math.floor(distance / sizes.hour);
    duration.hour = Math.floor((distance % sizes.day) / sizes.hour);
    duration.min = Math.floor((distance % sizes.hour) / sizes.min);

    let msg = duration.day !== 0 ? duration.day + ' days' : '';
    msg = duration.hour !== 0 && msg !== '' ? msg + ' ' + duration.hour + ' h' : msg ;
    msg = duration.min !== 0 && msg !== '' ? msg + ' ' + duration.min + ' min' : msg ;

    msg = msg !== '' ? '(' + msg + ')' : '';

    return msg;
  }

  getCategoryIcon() {
    let icon = '';
    if (this.event.name.includes('doors') || this.event.name.includes('entrance')) {
      return icon = 'fa-home';
    } else {
      this.event.categories.map ( x => {

        const y = x.toString().toLowerCase();
        if (y === 'game') {
          icon = 'fa-gamepad' ;
        } else if (y === 'streamcorner') {
          return icon = 'fa-play-circle-o';
        } else if (y === 'compo' )  {
          return icon = 'fa-image';
        }
      });
    }
    return icon;
  }

}
