import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Converter } from 'showdown';

@Directive({
  selector: '[asmMarkdown]'
})
export class MarkdownDirective implements AfterViewInit {
  private converter: Converter;
  @Input() markdownText: String;

  constructor(private el: ElementRef) {
    this.converter = new Converter({tables: true, headerLevelStart: 2, simplifiedAutoLink: true, strikethrough: true});
  }

  ngAfterViewInit(): void {
    if (!this.markdownText) {
      this.markdownText = this.el.nativeElement.innerHTML;
    }
    this.el.nativeElement.innerHTML = this.converter.makeHtml(this.markdownText + '');
  }

}
