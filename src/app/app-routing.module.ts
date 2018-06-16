import { SkeletorComponent } from './skeletor/skeletor.component';
import { EventResolve } from './event.resolve';
import { ContentResolve } from './content.resolve';
import { ApiClientResolve } from './api-client.resolve';
import { EventComponent } from './event/event.component';
import { ContentComponent } from './content/content.component';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';
import { NewsArchiveComponent } from './news/news-archive/news-archive.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { NewsArticleResolve } from './news/news-article.resolve';

const routes: Routes = [
  // If no event is specified, we will load default event.
  {
    path: '',
    resolve: { event: EventResolve },
    component: EventComponent
  },
  // If the event is known, we will load the page.
  {
    path: ':event/:lang',
    component: SkeletorComponent,
    resolve: {
      apiClient: ApiClientResolve,
      event: EventResolve
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ContentComponent,
        resolve: {
          content: ContentResolve
        }
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            component: NewsArchiveComponent,
            resolve: {
              articles: NewsArticleResolve
            }
          },
          {
            path: ':article',
            component: NewsArticleComponent,
            resolve: {
              article: NewsArticleResolve
            }
          }
        ]
      },
      {
        path: 'partners',
        component: SponsorsPageComponent
      },
      {
        path: 'sponsors',
        pathMatch: 'full',
        redirectTo: 'partners'
      },
      {
        path: '**',
        component: ContentComponent,
        resolve: {
          content: ContentResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics],
      {
      pageTracking: {
        clearQueryParams: true,
      }
    })
  ],
  providers: [
    EventResolve,
    ApiClientResolve,
    ContentResolve
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
