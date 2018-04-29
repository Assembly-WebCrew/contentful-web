import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';
import { ContentfulService } from '../core/contentful.service';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import * as qs from 'qs';
import { get } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { WINDOW } from '../core/window.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'asm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  resizeSubject: Subject<number> = new Subject<number>();
  resizeObservable: Observable<number> = this.resizeSubject.asObservable().throttleTime(200);
  header$: Observable<any>;
  event: any;
  scrolling = false;
  previousScrollPosition: number;
  scrollDirection: string;
  mobileMenuOpen = false;
  isMobile = false;
  subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private contentful: ContentfulService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    this.subscriptions.push(this.resizeObservable.subscribe(x => this.onWindowResize(x)));
    this.getHeader();
    this.checkMobileState(this.window.innerWidth);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe());
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
    }` }).map(data => data.menus[0]);
  }

  getLogo(isMobile) {
    if (this.scrolling && !isMobile) {
      return '/assets/images/generic-event-logo.png';
    } else if (this.event && this.event.logo && this.event.logo.fields) {
      return this.event.logo.fields.file.url + '?w=200';
    }
  }

  getUrl(item) {
    return this.contentful.getUrl(item);
  }

  onMobileMenuClick() {
    this.toggleMobileMenu(true);
  }

  @HostListener('window:scroll', [])
  onWindowScrollEvent() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.scrolling = true;
    } else if (this.scrolling && number < 10) {
      this.scrolling = false;
    }
    this.scrollDirection = this.previousScrollPosition > number ? 'up' : 'down';
    this.previousScrollPosition = number;
  }

  onWindowResize(width: number) {
    this.checkMobileState(width);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResizeEvent(width: number) {
    this.resizeSubject.next(width);
  }

  private checkMobileState(width: number) {
    this.isMobile = width && width < 1024;

    if (!this.isMobile && this.mobileMenuOpen) {
      this.toggleMobileMenu(false);
    }
  }

  private toggleMobileMenu(state = !this.mobileMenuOpen) {
    this.mobileMenuOpen = state;
  }
}
