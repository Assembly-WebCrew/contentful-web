import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-block-collapse',
  templateUrl: './block-collapse.component.html',
  styleUrls: ['./block-collapse.component.scss']
})
export class BlockCollapseComponent implements OnInit{
  content: any = {};
  ngOnInit() {
    this.event = this.route.snapshot.parent ? this.route.snapshot.parent.data.event : null;
    if (this.event) {
      this.startTime = new Date(this.event.startDate).getTime();
      this.endTime = new Date(this.event.endDate).getTime();
      this.setCountdown();
    }

  }
}
