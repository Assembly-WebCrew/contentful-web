import { ContentTypesModule } from './content-types/content-types.module';
import { ContentComponent, ContentResolve } from './content/content.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: ContentComponent,
    resolve: {
      content: ContentResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ContentTypesModule
  ],
  providers: [ContentResolve],
  exports: [RouterModule]
})
export class AppRoutingModule { }
