import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';
import * as qs from 'qs';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-block-sponsors',
  templateUrl: './block-sponsors.component.html',
  styleUrls: ['./block-sponsors.component.scss']
})
export class BlockSponsorsComponent implements OnInit {
  content: any = {};
  sponsors$: Observable<any>;
  isMainSponsors: boolean;

  static blockName = 'BlockSponsors';

  constructor(
    private contentful: ContentfulService) { }

  ngOnInit() {
    this.isMainSponsors = !this.content.title;
    const params = { 'fields.isMainSponsor': this.isMainSponsors };
    this.sponsors$ = this.contentful.query$<any>({
      query: gql`
    {
      sponsors(q: "${qs.stringify(params)}") {
        title
        logo {
          url
        }
        link
      }
    }` }).map(data => data.sponsors);
  }

}
