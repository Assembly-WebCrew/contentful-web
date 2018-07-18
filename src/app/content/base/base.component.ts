import { Component, OnInit, OnChanges, Input, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WINDOW } from '../../core/window.service';
import { ContentfulService } from '../../core/contentful.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'asm-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnChanges {
  @Input() content: any = {};
  background: string;
  tags: string;
  init: boolean;

  constructor(
    private contentful: ContentfulService,
    private router: Router,
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.setPageContent();
    this.init = true;
    this.getRouterEvents();
  }

  ngOnChanges() {
    if (this.init)
      this.setPageContent();
  }

  getBackground() {
    const event = this.contentful.getEvent();
    if (this.content && this.content.featuredImage)
      return 'url(' + this.content.featuredImage.url + '?w=1920&f=top)';
    else if (event.defaultBackground && event.defaultBackground.fields)
      return 'url(' + event.defaultBackground.fields.file.url + '?w=1920&f=top)';
    else
      return '';
  }

  setPageContent() {
    if (!this.content) { this.content = {}; }
    if (!this.content.title) { this.content.title = 'Page Not Found'; }
    this.background = this.getBackground();
    this.tags = this.content.tags ? this.content.tags.map(tag => tag.title).join(' ') : '';
  }

  getRouterEvents(): void {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const tree = this.router.parseUrl(event.urlAfterRedirects);
        if (!tree.fragment) {
          this.window.scroll(0, 0);
        } else {
          const element = this.document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView(true);
          }
        }
      });
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      setTimeout(() => {
        const element = this.document.querySelector('#' + tree.fragment);
        if (element) {
          element.scrollIntoView(true);
        }
      }, 100);
    }
  }
}
