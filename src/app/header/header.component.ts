import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { stringify as qsStringify } from 'qs';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map, throttleTime } from 'rxjs/operators';

import { ContentfulService } from '../core/contentful.service';
import { AsmEvent } from '../core/interfaces/event.interface';
import { Menu, MenuItem } from '../core/interfaces/menu.interface';
import { WINDOW } from '../core/window.service';

@Component({
  selector: 'asm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  resizeSubject: Subject<number> = new Subject<number>();
  resizeObservable: Observable<number> = this.resizeSubject.asObservable().pipe(throttleTime(200));
  header$: Observable<Menu>;
  event: AsmEvent;
  scrolling = false;
  previousScrollPosition: number;
  scrollDirection: string;
  mobileMenuOpen = false;
  isMobile = false;
  subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private contentful: ContentfulService,
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.data.event;
    this.subscriptions.push(this.resizeObservable.subscribe(x => this.onWindowResize(x)));
    this.getHeader();
    this.checkMobileState(this.window.innerWidth);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  query(query: any): Observable<any> {
    return this.contentful.query$<any>({
      query: query}).pipe(catchError(_ => of('error')));
  }


  getHeader(): void {
    const params = { 'fields.title': 'Main Menu' };
    const sysId = `sys { id }`;
    const pageType = `page { slug ${sysId} }`;
    const pageMenuItem = `page { title url ${pageType} ${sysId} }`;
    const onMenuItem = `... on MenuItem { title url ${pageType} ${sysId} }`;
    this.header$ = this.query( gql`
    {
      menus(q: "${qsStringify(params)}") {
        title
        highlights {
          title
          icon
          item {
            title
            url
            ${pageType}
          }
        }
        ${pageMenuItem}
        items {
          ${onMenuItem}
          ... on Menu {
            label
            ${pageMenuItem}
            items {
              ${onMenuItem}
              ... on Menu {
                label
                ${pageMenuItem}
                items {
                  ${onMenuItem}
                }
              }
            }
          }
        }
      }
    }`).pipe(map((data: any) => data.menus[0]));
  }

  getLogo(isMobile: boolean): string {
    if (this.scrolling && !isMobile) {
      return '/assets/images/generic-event-logo.png';
    } else if (this.event && this.event.logo && this.event.logo.fields) {
      return this.event.logo.fields.file.url + '?w=200';
    }
  }

  getUrl(item: MenuItem): string {
    return this.contentful.getUrl(item);
  }

  onMobileMenuClick(): void {
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

  private checkMobileState(width: number): void {
    this.isMobile = width && width < 1024;

    if (!this.isMobile && this.mobileMenuOpen) {
      this.toggleMobileMenu(false);
    }
  }

  private toggleMobileMenu(state = !this.mobileMenuOpen): void {
    this.mobileMenuOpen = state;
  }
}
