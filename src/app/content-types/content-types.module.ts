import { ArticleComponent } from './article/article.component';
import { FrontpageComponent } from './frontpage/frontpage.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const contentComponents = new Map([
  ['Frontpage', FrontpageComponent],
  ['Article', ArticleComponent]
])

const contentComponentsArray = Array.from(contentComponents.values());

@NgModule({
  imports: [CommonModule],
  declarations: [
    ...contentComponentsArray
  ],
  entryComponents: contentComponentsArray
})
export class ContentTypesModule { }
