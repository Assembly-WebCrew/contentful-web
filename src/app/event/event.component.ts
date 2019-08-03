import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  events = [];
  pastEvents = [];
  logo = '/assets/images/generic-event-logo.png';

  constructor(
    private route: ActivatedRoute) {
    const now = Date.now();
    this.route.data.subscribe((data: { events: any }) => {
      this.events = data.events ? data.events
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .filter(event => {
          if (new Date(event.endDate).getTime() - now > 0) {
            return event;
          }
          this.pastEvents.push(event);
        }) : [];
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
