import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'asm-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  @Input() content: any = {};
  background: string;
  tags: string;
  init: boolean;

  constructor(private title: Title) { }

  ngOnInit() {
    this.setPageContent();
    this.init = true;
  }

  ngOnChanges() {
    if (this.init)
      this.setPageContent();
  }

  getBackground() {
    if (this.content && this.content.featuredImage)
      return 'url(' + this.content.featuredImage.url + '?w=1440)';
  }

  setPageContent() {
    if (!this.content) { this.content = {}; }
    if (!this.content.title) { this.content.title = 'Page Not Found'; }
    this.title.setTitle(this.content.title + ' - Assembly');
    //this.title.setTitle(this.content.title + ' - ' + this.event.eventTitle); // use event name
    this.background = this.getBackground();
    this.tags = this.content.tags ? this.content.tags.map(tag => tag.title).join(" ") : "";
  }
}
