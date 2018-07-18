import { Component } from '@angular/core';

@Component({
  selector: 'asm-block-markdown',
  templateUrl: './block-markdown.component.html',
  styleUrls: ['./block-markdown.component.scss']
})
export class BlockMarkdownComponent {
  static blockName = 'BlockMarkdown';

  content: any = {};
}
