import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-block-zipper-content',
  templateUrl: './block-zipper-content.component.html',
  styleUrls: ['./block-zipper-content.component.scss']
})
export class BlockZipperContentComponent implements OnInit{
  content: any = {};
  ngOnInit() {
    console.log(this.content);
  }
}
