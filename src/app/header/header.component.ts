import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';
import { ContentfulService } from '../core/contentful.service';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import * as qs from 'qs';
import { get } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'asm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    "(window.scroll)": "onScrollEvent($event)"
  }
})
export class HeaderComponent implements OnInit {
  header$: Observable<any>;
  event: any;
  highlightMenu: any[];
  menu: any[];
  scrolling: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private contentful: ContentfulService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    const params = { 'fields.title': 'Main Menu' };
    this.header$ = this.contentful.query$<any>({ query: gql`
    {
      menus(q: "${qs.stringify(params)}") {
        title
        items {
          ... on MenuItem {
            title
            url
            isContentHighlight
            icon
            page {
              slug
            }
          }
        }
      }
    }` }).map(data => data.menus[0]);
  }

  getLogo() {
    if (this.scrolling) {
      return "/assets/images/generic-event-logo.png";
    } else if (this.event && this.event.logo && this.event.logo.fields) {
      return this.event.logo.fields.file.url;
    }
  }

  getMenuItems(items, isHighlight: boolean) {
    if (!items)
      return [];
    return items.filter(item => {
      return isHighlight ? item.isContentHighlight : !item.isContentHighlight;
    });
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

  onNavigation(item, event : Event) {
    let url : string = this.getUrl(item);

    if (url.startsWith("/")) {
      event.preventDefault();
      this.router.navigate([url]);
      return false;
    }
  }

  @HostListener("window:scroll", [])
  onWindowScrollEvent() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.scrolling = true;
    } else if (this.scrolling && number < 10) {
      this.scrolling = false;
    }
  }

  onScrollEvent(event) {

  }
}
