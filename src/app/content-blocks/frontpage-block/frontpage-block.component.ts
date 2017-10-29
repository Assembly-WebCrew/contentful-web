import { Component } from '@angular/core';

@Component({
  selector: 'asm-frontpage-block',
  templateUrl: './frontpage-block.component.html',
  styleUrls: ['./frontpage-block.component.scss']
})
export class FrontpageBlockComponent {
  content: any = {};
  dates: string = "2.-4.8.2018";
  place: string = "Messukeskus, Helsinki";
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor() {
setInterval(() => {
  var starttime = new Date("January 13, 2018 11:13:00").getTime();
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = starttime - now;

  this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
  this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);
}
}
