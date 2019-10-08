import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentfulService } from '../../core/contentful.service';
import { AsmEvent } from '../../core/interfaces/event.interface';
import { Menu, MenuItem } from '../../core/interfaces/menu.interface';

@Component({
  selector: 'asm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewChecked {
  @Input() menu: [Menu | MenuItem];
  event: AsmEvent;

  constructor(
    private contentful: ContentfulService,
    private route: ActivatedRoute,
    private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.data.event;
  }

  ngAfterViewChecked(): void {
    if (this.menu) {
      this.menu.forEach((item: MenuItem): void => this.itemHasLink(item));
    }
    this.changeDetectionRef.detectChanges();
  }

  itemHasLink(item: Menu | MenuItem): void {
    if (item.link) return;

    if (item.__typename === 'MenuItem') {
      item = item as MenuItem;
      item.link = this.contentful.getUrl(item);
    }

    if (item.__typename === 'Menu') {
      item = item as Menu;
      item.link = !!item.page ? this.contentful.getUrl(item.page) : null;

      if (item.items) {
        item.items.forEach((i: Menu | MenuItem): void => this.itemHasLink(i));
      }
    }
  }

  isMenuSectioned(item: Menu): boolean {
    return item.__typename === 'Menu' && item.items.some(subitem => subitem.__typename === 'Menu');
  }

  onNavigation(item: MenuItem, event: Event): void {
    this.contentful.onNavigation(item, event);
  }

  trackItem(index: number, item: MenuItem | Menu): number | string {
    const id: string = item.sys && item.sys.id ? item.sys.id : item.title;
    return id || index;
  }
}
