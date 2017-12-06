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
  mainSponsors: any[] = [];
  otherSponsors: any[] = [];

  constructor(
    private contentful: ContentfulService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Sponsors");
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
          this.mainSponsors.push(sponsor);
        } else {
          this.otherSponsors.push(sponsor);
        }
      })
    });
  }
}
