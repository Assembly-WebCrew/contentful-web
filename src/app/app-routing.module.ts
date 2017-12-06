import { SkeletorComponent } from './skeletor/skeletor.component';
import { EventResolve } from './event.resolve';
import { ContentResolve } from './content.resolve';
import { ApiClientResolve } from './api-client.resolve';
import { EventComponent } from './event/event.component';
import { ContentComponent } from './content/content.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';

const routes: Routes = [
  // If no event is specified, we will load default event.
  {
    path: '',
    resolve: { event: EventResolve },
    component: EventComponent
  },
  // If the event is known, we will load the page.
  {
    path: ':event',
    component: SkeletorComponent,
    resolve: {
      apiClient: ApiClientResolve,
      event: EventResolve
    },
    children: [
      {
        path: 'sponsors',
        component: SponsorsPageComponent
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
    ContentResolve
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
