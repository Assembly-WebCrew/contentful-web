import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-block-section',
  templateUrl: './block-section.component.html',
  styleUrls: ['./block-section.component.scss']
})
export class BlockSectionComponent implements OnInit {
  static blockName = 'BlockSection';

  content: any = {};

  constructor() { }

  ngOnInit() {
  }

}
