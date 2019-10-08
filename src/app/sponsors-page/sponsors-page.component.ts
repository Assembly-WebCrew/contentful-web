import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../core/contentful.service';
import gql from 'graphql-tag';
import { Title } from '@angular/platform-browser';
import { Partner } from '../core/interfaces/partner.interface';

@Component({
  selector: 'asm-sponsors-page',
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.scss']
})
export class SponsorsPageComponent implements OnInit {
  mainPartners: Partner[] = [];
  otherPartners: Partner[] = [];
  mediaPartners: Partner[] = [];
  content: any = {
    title: 'Partners',
    tags: ['partners']
  };

  constructor(
    private contentful: ContentfulService) { }

  ngOnInit() {
    this.contentful.query<any>({
      query: gql`
    {
      sponsors {
        partnerLevel
        title
        importance
        logo {
          url
        }
        link
        description
      }
    }` }).then(response => {
      response.data.sponsors.forEach((sponsor: Partner) => {
        if (sponsor.partnerLevel === 'main') {
          this.mainPartners.push(sponsor);
        } else if (sponsor.partnerLevel === 'media') {
          this.mediaPartners.push(sponsor);
        } else {
          this.otherPartners.push(sponsor);
        }
      });
      this.mainPartners.sort((a, b) => +b.importance - +a.importance || (a.title + '').localeCompare((b.title + '')));
      this.otherPartners.sort((a, b) => +b.importance - +a.importance || (a.title + '').localeCompare((b.title + '')));
      this.mediaPartners.sort((a, b) => +b.importance - +a.importance || (a.title + '').localeCompare((b.title + '')));
    });
  }

  getLogo(url: string): string {
    if (url) {
      return url + '?w=250&h=100&fit=pad';
    }
  }

}
