import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Input('menu') menu: any[];
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  event: any;

  constructor(
    private route: ActivatedRoute,
    private contentful: ContentfulService,
    private router: Router) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
  }

  onCloseClick() {
    this.onClose.emit();
  }

  getUrl(item) {
    return this.contentful.getUrl(item);
  }

  onNavigation(item, event: Event) {
    this.contentful.onNavigation(item, event);
  }
}
