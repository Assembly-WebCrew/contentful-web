import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsmEvent } from '../../core/interfaces/event.interface';
import { NewsItem } from '../../core/interfaces/news-item.interface';

@Component({
  selector: 'asm-news-archive',
  templateUrl: './news-archive.component.html',
  styleUrls: ['./news-archive.component.scss']
})
export class NewsArchiveComponent implements OnInit {
  news$: Observable<NewsItem[]>;
  articles: NewsItem[];
  event: AsmEvent;
  content: any = {
    title: 'News',
    tags: ['news']
  };

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event = this.route.snapshot.data.event;
    this.route.data.subscribe((data: { articles: NewsItem[] }) => {
      this.articles = data.articles && data.articles.map(a => a).sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      }) ||  [];
    });
  }

  getImage(article: NewsItem): string {
    if (article.featuredImage && article.featuredImage.url) {
      return 'url(' + article.featuredImage.url + '?w=400)';
    } else {
      return 'url(/assets/images/background-picture.jpg)';
    }
  }
}
