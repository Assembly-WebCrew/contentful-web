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
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  header$: Observable<any>;
  event: any;
  scrolling: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private contentful: ContentfulService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    const params = { 'fields.title': 'Main Menu' };
    this.header$ = this.contentful.query$<any>({
      query: gql`
    {
      menus(q: "${qs.stringify(params)}") {
        title
        highlights {
          title
          icon
          item {
            title
            url
            page {
              slug
            }
          }
        }
        page {
          title
          url
          page {
            slug
          }
        }
        items {
          ... on MenuItem {
            title
            url
            page {
              slug
            }
          }
          ... on Menu {
            label
            page {
              title
              url
              page {
                slug
              }
            }
            items {
              ... on MenuItem {
                title
                url
                page {
                  slug
                }
              }
              ... on Menu {
                label
                page {
                  title
                  url
                  page {
                    slug
                  }
                }
                items {
                  ... on MenuItem {
                    title
                    url
                    page {
                      slug
                    }
                  }
                }
              }
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

  getUrl(item) {
      if (item.page) {
        return `/${this.event.name}/${item.page.slug}`;
      } else {
        if (item.url && item.url[0] === '/')
          return `/${this.event.name}${item.url}`;
  
        return item.url;
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
}
