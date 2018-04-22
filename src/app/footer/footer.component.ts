import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../core/contentful.service';
import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';
import * as qs from 'qs';
import { get } from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'asm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer$: Observable<any>;
  event: any;
  year: number;

  constructor(
    private contentful: ContentfulService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.year = this.getYear();
    this.event = this.route.snapshot.data.event;
    const params = { 'fields.title': 'Footer Menu' };
    this.footer$ = this.contentful.query$<any>({
      query: gql`
    {
      menus(q: "${qs.stringify(params)}") {
        title
        items {
          ... on Menu {
            label
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
    }` }).map(data => data.menus[0]);
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

    if (url.startsWith('/')) {
      event.preventDefault();
      this.router.navigate([url]);
      return false;
    }
  }
  getYear() {
    return new Date().getFullYear();
  }
}
