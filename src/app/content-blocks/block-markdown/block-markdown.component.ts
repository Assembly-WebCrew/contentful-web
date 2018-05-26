import { Component } from '@angular/core';

@Component({
  selector: 'asm-block-markdown',
  templateUrl: './block-markdown.component.html',
  styleUrls: ['./block-markdown.component.scss']
})
export class BlockMarkdownComponent {
  content: any = {};

  static blockName = "BlockMarkdown";
}
