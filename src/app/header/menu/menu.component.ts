import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input('menu') menu: any[];
  event: any;

  constructor(private router: Router,
    private contentful: ContentfulService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
  }

  getUrl(item) {
    return this.contentful.getUrl(item);
  }

  isMenuSectioned(item) {
    return item.__typename === 'Menu' && item.items.some(subitem => subitem.__typename === 'Menu');
  }

  onNavigation(item, event: Event) {
    this.contentful.onNavigation(item, event);
  }
}
