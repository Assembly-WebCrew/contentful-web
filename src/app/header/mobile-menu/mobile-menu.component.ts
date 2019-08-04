import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentfulService } from '../../core/contentful.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import * as qs from 'qs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'asm-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  @Input() menu: any[];
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  header$: Observable<any>;
  event: any;

  constructor(
    private route: ActivatedRoute,
    private contentful: ContentfulService,
    private router: Router,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    this.renderer.addClass(document.body, 'mobile-menu-open');
    this.getHeader();
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

  getHeader(): void {
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
    }` }).pipe(map((data: any) => data.menus[0]));
  }

  onNavigation(item, event: Event) {
    this.contentful.onNavigation(item, event);
    this.onClose.emit();
  }

  onCollapse(item) {
    item.show = !item.show;
  }
}
