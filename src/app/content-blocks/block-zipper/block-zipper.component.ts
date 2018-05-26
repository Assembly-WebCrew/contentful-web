import { Component } from '@angular/core';

@Component({
  selector: 'asm-block-zipper',
  templateUrl: './block-zipper.component.html',
  styleUrls: ['./block-zipper.component.scss']
})
export class BlockZipperComponent {
  content: any = {};

  static blockName = "BlockZipper";
}
