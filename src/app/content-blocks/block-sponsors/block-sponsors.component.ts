
import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import * as qs from 'qs';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-block-sponsors',
  templateUrl: './block-sponsors.component.html',
  styleUrls: ['./block-sponsors.component.scss']
})
export class BlockSponsorsComponent implements OnInit {
  static blockName = 'BlockSponsors';
  content: any = {};
  sponsors$: Observable<any>;
  partnerLevel: String = 'main';

  constructor(
    private contentful: ContentfulService) { }

  ngOnInit() {
    this.partnerLevel = !this.content.title ? 'main' : 'partner';
    const params = { 'fields.partnerLevel': this.partnerLevel };
    this.sponsors$ = this.contentful.query$<any>({
      query: gql`
    {
      sponsors(q: "${qs.stringify(params)}") {
        title
        importance
        logo {
          url
        }
        link
      }
    }` }).pipe(map(data => data.sponsors.map(s => s).sort((a, b) => +b.importance - +a.importance)));
  }

}
