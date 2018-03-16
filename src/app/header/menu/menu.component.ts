import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input('menu') menu: any[];
  event: any;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
  }

  getUrl(item) {
    if (item.page) {
      return `/${this.event.name}/${item.page.slug}`;
    } else {
      if (item.url && item.url[0] === '/')
        return `/${this.event.name}${item.url}`;

      return item.url || '';
    }
  }

  isMenuSectioned(item) {
    return item.__typename === 'Menu' && item.items.some(subitem => subitem.__typename === 'Menu');
  }

  onNavigation(item, event: Event) {
    let url: string = this.getUrl(item);

    if (url.startsWith("/")) {
      event.preventDefault();
      this.router.navigate([url]);
      return false;
    }
  }
}
