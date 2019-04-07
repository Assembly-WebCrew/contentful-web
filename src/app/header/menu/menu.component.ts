import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentfulService } from '../../core/contentful.service';
import { Menu, MenuItem } from '../../models/menu.model';

@Component({
  selector: 'asm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menu: [Menu | MenuItem];
  event: any;
  openedSection: string;

  constructor(
    private contentful: ContentfulService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
  }

  getUrl(item: any) {
    return this.contentful.getUrl(item);
  }

  isMenuSectioned(item: Menu) {
    return item.__typename === 'Menu' && item.items.some(subitem => subitem.__typename === 'Menu');
  }

  onNavigation(item: any, event: Event) {
    this.contentful.onNavigation(item, event);
  }

  openSection(item: Menu) {
    this.openedSection = item.label;
  }

  closeSection(item: Menu) {
    this.openedSection = undefined;
  }

  isOpen(item: Menu) {
    return this.openedSection === item.label;
  }


  trackMenuItemsFn(index: number, item: MenuItem | Menu) {
    if (item.__typename === 'Menu') {
      return item['label'];
    } else if (item.__typename === 'MenuItem') {
      return item['title'];
    }
  }
}
