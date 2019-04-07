import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/contentful.service';
import * as qs from 'qs';
import gql from 'graphql-tag';

@Component({
  selector: 'asm-block-news',
  templateUrl: './block-news.component.html',
  styleUrls: ['./block-news.component.scss']
})
export class BlockNewsComponent implements OnInit {
  static blockName = 'BlockNews';

  content: any = {};
  articles: Array<any> = [];
  newsUrl: Array<any> = [];

  constructor(private contentful: ContentfulService) { }

  ngOnInit() {
    this.newsUrl = ['/', this.contentful.getEvent().name, 'news'];
    this.getNews();
  }

  getNews(): void {
    const params = { 'fields.published': true };
    if (this.content && this.content.filterByCategory) {
      params['fields.category'] = this.content.filterByCategory;
    }
    if (this.content && this.content.frontpageFeaturedNewsOnly) {
      params['fields.onFrontpage'] = true;
    }
    const maxCount = (this.content && +this.content.itemCount) || 3;

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
            });
            if (this.content && this.content.filterByTag) {
              this.articles = this.articles.filter(a => a.tags && this.content.filterByTag.split(',')
                .every(tag => a.tags.indexOf(tag) > -1));
            }
            this.articles = this.articles.slice(0, maxCount);
          }
        }
      });
  }

  getImage(article: any, i: number) {
    if (article.featuredImage && article.featuredImage.url) {
      let height: number;
      if (i === 0) { height = 460;
      } else { height = 210; }
      // console.log(i, article.featuredImage.url, height);
      return 'url(' + article.featuredImage.url + '?h=' + height + ')';
    } else {
      return 'url(/assets/images/background-picture.jpg)';
    }
  }

  getLink(slug: string) {
    return this.newsUrl.concat([slug]);
  }
}
