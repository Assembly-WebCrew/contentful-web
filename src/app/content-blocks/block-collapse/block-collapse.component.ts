import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'asm-block-collapse',
  templateUrl: './block-collapse.component.html',
  styleUrls: ['./block-collapse.component.scss']

})
export class BlockCollapseComponent implements OnInit {
  content: any = {};
  opened: Boolean = false;
  id: string;

  static blockName = 'BlockCollapse';

  ngOnInit() {
    if (this.content.title) {
      this.id = this.content.title.replace(/\s/gi, '-').replace(/[^\w-]/gi, '').toLowerCase();
    }
  }

  toggle() {
      this.opened = !this.opened;
  }

}
