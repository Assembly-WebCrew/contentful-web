import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../core/contentful.service';
import gql from 'graphql-tag';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'asm-sponsors-page',
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.scss']
})
export class SponsorsPageComponent implements OnInit {
  mainPartners: any[] = [];
  otherPartners: any[] = [];
  content: any = {
    title: 'Partners', // TODO translations
    tags: ['partners']
  };

  constructor(
    private contentful: ContentfulService,
    private title: Title) { }

  ngOnInit() {
    this.contentful.query<any>({
      query: gql`
    {
      sponsors {
        isMainSponsor
        title
        logo {
          url
        }
        link
        description
      }
    }` }).then(response => {
      response.data.sponsors.forEach(sponsor => {
        if (sponsor.isMainSponsor) {
          this.mainPartners.push(sponsor);
        } else {
          this.otherPartners.push(sponsor);
        }
      });
      this.mainPartners.sort((a, b) => (a.title + '').localeCompare((b.title + '')));
      this.otherPartners.sort((a, b) => (a.title + '').localeCompare((b.title + '')));
    });
  }

  getLogo(url) {
    if (url) {
      return url + '?w=300';
    }
  }

}
