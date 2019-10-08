import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsItem } from '../../core/interfaces/news-item.interface';

@Component({
  selector: 'asm-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  article: NewsItem = {};
  content: any = {
    title: 'News'
  };

  constructor(
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { article: NewsItem }) => {
      this.article = data.article || {};
    });
  }

  getImage(article: NewsItem) {
    if (article.featuredImage && article.featuredImage.url) {
      return article.featuredImage.url + '?w=600';
    } else {
      return '/assets/images/background-picture.jpg';
    }
  }
}
