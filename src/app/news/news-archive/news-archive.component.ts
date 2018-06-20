import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';
import { ContentfulService } from '../../core/contentful.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'asm-news-archive',
  templateUrl: './news-archive.component.html',
  styleUrls: ['./news-archive.component.scss']
})
export class NewsArchiveComponent implements OnInit {
  news$: Observable<any>;
  articles: any;
  event: any;
  content: any = {
    title: 'News',
    tags: ['news']
  };

  constructor(
    private contentful: ContentfulService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    this.route.data.subscribe((data: { articles: any }) => {
      this.articles = data.articles && data.articles.map(a => a).sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      }) ||  [];
    });
  }

  getImage(article: any) {
    if (article.featuredImage && article.featuredImage.url) {
      return 'url(' + article.featuredImage.url + '?w=400)';
    } else {
      return 'url(/assets/images/background-picture.jpg)';
    }
  }
}
