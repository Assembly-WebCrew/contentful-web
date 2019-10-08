import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'asm-block-collapse',
  templateUrl: './block-collapse.component.html',
  styleUrls: ['./block-collapse.component.scss']

})
export class BlockCollapseComponent implements OnInit {
  static blockName = 'BlockCollapse';

  content: any = {};
  opened: Boolean = false;
  id: string;

  ngOnInit(): void {
    if (this.content.title) {
      this.id = this.content.title.replace(/\s/gi, '-').replace(/[^\w-]/gi, '').toLowerCase();
    }
  }

  toggle(): void {
      this.opened = !this.opened;
  }

}
