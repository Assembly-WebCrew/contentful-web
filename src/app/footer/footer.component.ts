import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../core/contentful.service';
import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';
import * as qs from 'qs';
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
    this.year = new Date().getFullYear();
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

  onNavigation(item, event: Event) {
    this.contentful.onNavigation(item, event);
  }

  getUrl(item) {
    return this.contentful.getUrl(item);
  }

}
