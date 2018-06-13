import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContentfulService } from '../../core/contentful.service';
import * as qs from 'qs';
import gql from 'graphql-tag';

@Component({
  selector: 'asm-block-news',
  templateUrl: './block-news.component.html',
  styleUrls: ['./block-news.component.scss']
})
export class BlockNewsComponent implements OnInit {
  content: any = {};
  articles: Array<any> = [];
  newsUrl: Array<any> = [];

  static blockName = 'BlockNews';

  constructor(private contentful: ContentfulService) { }

  ngOnInit() {
    this.newsUrl = ['/', this.contentful.getEvent().name, 'news'];
    this.getNews();
  }

  getNews(): void {
    const params = {};
    if (this.content && this.content.filterByCategory) {
      params['fields.category'] = this.content.filterByCategory;
    }

    this.contentful.query<any>({
      query: gql`
    {
      newsItems(q: "${qs.stringify(params)}") {
        date
        slug
        title
        tags
        body
        ingress
        published
        onFrontpage
        event
        category
        featuredImage{
          title
          url
        }
      }
    }` }).then(response => {
        if (response && response.data) {
          this.articles = response.data.newsItems;
          if (this.articles && this.articles.length) {
            this.articles = this.articles.map(a => a).sort((a, b) => {
              if (b.date && a.date)
                return +new Date(b.date) - +new Date(a.date);
              return -1;
            }).slice(0, 3);
          }
        }
      });
  }

  getImage(article: any) {
    return 'url(' + ((article.featuredImage && article.featuredImage.url) || '/assets/images/background-picture.jpg') + ')';
  }
}
