import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  events = [];
  logo = '/assets/images/generic-event-logo.png';

  constructor(
    private route: ActivatedRoute) {
    this.route.data.subscribe((data: { events: any }) => {
      this.events = data.events ? data.events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) : [];
    });
  }

  getEventDates(event: any): string {
    const startTime = new Date(event.startDate);
    const endTime = new Date(event.endDate);
    let dates = startTime.getDate() + '.';

    if (startTime.getMonth() !== endTime.getMonth()) {
      dates += (startTime.getMonth() + 1) + '.';
    }

    dates += `-${endTime.getDate()}.${endTime.getMonth() + 1}.${endTime.getFullYear()}`;

    return dates;
  }

}
