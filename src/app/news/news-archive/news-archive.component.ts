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
  event: any;
  content: any = {
    title: "News",
    tags: ["news"]
  };

  constructor(
    private contentful: ContentfulService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    this.news$ = this.contentful.query$<any>({ // TODO: can you filter by publishTime?
      query: gql`{
        newsArticles {
          title
          slug
          publishTime
          tags {
            title
          }
        }
      }`}).map(data => {
      console.log(data);
      return data.newsArticles;
    });
  }

}
