
import {map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { stringify as qsStringify } from 'qs';
import { ContentfulService } from '../../core/contentful.service';
import { Partner } from '../../core/interfaces/partner.interface';

@Component({
  selector: 'asm-block-sponsors',
  templateUrl: './block-sponsors.component.html',
  styleUrls: ['./block-sponsors.component.scss']
})
export class BlockSponsorsComponent implements OnInit {
  static blockName = 'BlockSponsors';
  content: any = {};
  sponsors$: Observable<Partner>;
  partnerLevel: String = 'main';

  constructor(
    private contentful: ContentfulService) { }

  ngOnInit(): void {
    this.partnerLevel = !this.content.title ? 'main' : 'partner';
    const params = { 'fields.partnerLevel': this.partnerLevel };
    this.sponsors$ = this.contentful.query$<any>({
      query: gql`
    {
      sponsors(q: "${qsStringify(params)}") {
        title
        importance
        logo {
          url
        }
        link
      }
    }` }).pipe(map((data: any) => data.sponsors.map((s: Partner) => s).sort((a: Partner, b: Partner) => +b.importance - +a.importance)));
  }

}
