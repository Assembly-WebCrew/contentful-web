import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-block-section',
  templateUrl: './block-section.component.html',
  styleUrls: ['./block-section.component.scss']
})
export class BlockSectionComponent implements OnInit {
  content: any = {};

  constructor() { }

  ngOnInit() {
  }

}
