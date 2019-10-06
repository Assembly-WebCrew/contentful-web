import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContentfulService } from '../../core/contentful.service';
import { Menu, MenuItem } from '../../core/interfaces/menu.interface';

@Component({
  selector: 'asm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menu: [Menu | MenuItem];
  event: any;

  constructor(private router: Router,
    private contentful: ContentfulService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.data.event;
  }

  getUrl(item: MenuItem): string {
    return this.contentful.getUrl(item);
  }

  isMenuSectioned(item: Menu): boolean {
    return item.__typename === 'Menu' && item.items.some(subitem => subitem.__typename === 'Menu');
  }

  onNavigation(item: MenuItem, event: Event): void {
    this.contentful.onNavigation(item, event);
  }
}
