import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'asm-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  article: any = {};
  content: any = {
    title: 'News'
  };

  constructor(
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { article: any }) => {
      this.article = data.article || {};
    });
  }

  getImage(article: any) {
    if (article.featuredImage && article.featuredImage.url) {
      return article.featuredImage.url + '?w=600';
    } else {
      return '/assets/images/background-picture.jpg';
    }
  }
}
