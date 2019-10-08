import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-block-countdown',
  templateUrl: './block-countdown.component.html',
  styleUrls: ['./block-countdown.component.scss']
})
export class BlockCountdownComponent implements OnInit {
  static blockName = 'BlockCountdown';

  content: any = {};
  event: any;
  interval: any;
  hasStarted: boolean;
  hasEnded: boolean;
  isCountingDown: boolean;
  months = 0;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  startTime = 0;
  endTime = 0;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.parent ? this.route.snapshot.parent.data.event : null;
    if (this.event) {
      this.startTime = new Date(this.event.startDate).getTime();
      this.endTime = new Date(this.event.endDate).getTime();
      this.setCountdown();
    }
  }

  /**
   * Set countdown for event start, if event is on going, show countdown for event ending.
   */
  private setCountdown(): void {
    if (this.event) {
      this.interval = setInterval(() => {
        const now = new Date().getTime();
        const sec = 1000;
        const min = 60 * sec;
        const hour = 60 * min;
        const day = 24 * hour;
        const month = 30.42 * day;
        let distance = this.startTime - now;

        // event has started
        if (distance < 0) {
          distance = this.endTime - now;
          this.hasStarted = true;
        }
        // event has ended, clear countdown
        if (distance < 0) {
          this.hasEnded = true;
          this.isCountingDown = false;
          return clearInterval(this.interval);
        }
        this.isCountingDown = true;
        this.months = Math.floor(distance / month);
        this.days = Math.floor((distance % month) / day);
        this.hours = Math.floor((distance % day) / hour);
        this.minutes = Math.floor((distance % hour) / min);
        this.seconds = Math.floor((distance % min) / sec);
      }, 1000);
    }
  }
}
