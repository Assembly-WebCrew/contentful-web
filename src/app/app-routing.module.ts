import { SkeletorComponent } from './skeletor/skeletor.component';
import { EventResolve } from './event.resolve';
import { ContentResolve } from './content.resolve';
import { ApiClientResolve } from './api-client.resolve';
import { EventComponent } from './event/event.component';
import { ContentComponent } from './content/content.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';
import { NewsArchiveComponent } from './news/news-archive/news-archive.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { NewsArticleResolve } from './news/news-article.resolve';
import { MetaResolve } from './meta.resolve';

const routes: Routes = [
  // Show landing page
  {
    path: '',
    resolve: { events: EventResolve },
    component: EventComponent,
    pathMatch: 'full'
  },
  // If the event is known, we will load the event page.
  {
    path: ':event',
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
              articles: NewsArticleResolve,
              meta: MetaResolve
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
        component: SponsorsPageComponent,
        resolve: {
          meta: MetaResolve
        }
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
    RouterModule.forRoot(routes)
  ],
  providers: [
    EventResolve,
    ApiClientResolve,
    ContentResolve,
    MetaResolve
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
