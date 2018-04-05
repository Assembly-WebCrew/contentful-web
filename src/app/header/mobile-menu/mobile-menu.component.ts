import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'asm-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Input('menu') menu: any[];
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  event: any;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
  }

  onCloseClick() {
    this.onClose.emit();
  }

  getUrl(item) {
    if (item.page) {
      return `/${this.event.name}/${item.page.slug}`;
    } else {
      if (item.url && item.url[0] === '/')
        return `/${this.event.name}${item.url}`;

      return item.url;
    }
  }

  onNavigation(item, event: Event) {
    const url: string = this.getUrl(item);
    this.onCloseClick();

    if (url.startsWith('/')) {
      event.preventDefault();
      this.router.navigate([url]);
      return false;
    }
  }
}
