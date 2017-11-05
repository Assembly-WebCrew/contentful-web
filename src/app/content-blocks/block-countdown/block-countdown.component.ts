import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-block-countdown',
  templateUrl: './block-countdown.component.html',
  styleUrls: ['./block-countdown.component.scss']
})
export class BlockCountdownComponent implements OnInit {
  content: any = {};
  event: any;
  interval: any;
  months: number = 0;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  startTime: number = 0;
  endTime: number = 0;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
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
  private setCountdown() {
    if (this.event) {
      this.interval = setInterval(() => {
        let now = new Date().getTime();
        let distance = this.startTime - now;

        // event has started
        if (distance < 0) {
          distance = this.endTime - now;
        }
        // event has ended, clear countdown
        if (distance < 0) {
          return clearInterval(this.interval);
        }

        this.months = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }, 1000);
    }
  }
}
