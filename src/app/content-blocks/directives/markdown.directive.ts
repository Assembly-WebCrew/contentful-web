import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Converter } from 'showdown';

@Directive({
  selector: '[asmMarkdown]'
})
export class MarkdownDirective implements AfterViewInit {
  private converter: Converter;

  constructor(private el: ElementRef) {
    this.converter = new Converter();
  }

  ngAfterViewInit() {
    const rawMarkdown = this.el.nativeElement.innerHTML;
    this.el.nativeElement.innerHTML = this.converter.makeHtml(rawMarkdown);
  }

}
