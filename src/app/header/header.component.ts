import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { ContentfulService } from '../core/contentful.service';
import { Component, OnInit } from '@angular/core';
import * as qs from 'qs';
import { get } from 'lodash';

@Component({
  selector: 'asm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  header$: any;
  event: any;

  constructor(
    private contentful: ContentfulService,
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
            page {
              slug
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
}
