import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-block-collapse',
  templateUrl: './block-collapse.component.html',
  styleUrls: ['./block-collapse.component.scss']
})
export class BlockCollapseComponent implements OnInit{
  show: false;
  content: any = {};
  ngOnInit() {

  }
}
