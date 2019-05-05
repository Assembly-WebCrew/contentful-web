import { Component, EventEmitter, Input, OnInit, Output, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentfulService } from '../../core/contentful.service';
import { MenuItem, Menu } from '../../core/interfaces/menu.interface';

@Component({
  selector: 'asm-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  @Input() menu: [ Menu | MenuItem];
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  event: any;

  constructor(
    private route: ActivatedRoute,
    private contentful: ContentfulService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    this.renderer.addClass(document.body, 'mobile-menu-open');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'mobile-menu-open');
  }

  onCloseClick() {
    this.onClose.emit();
  }

  getUrl(item) {
    return this.contentful.getUrl(item);
  }

  getLogo() {
    if (this.event && this.event.logo && this.event.logo.fields) {
      return this.event.logo.fields.file.url + '?w=300';
    }
  }

  onNavigation(item, event: Event) {
    this.contentful.onNavigation(item, event);
    this.onClose.emit();
  }
}
