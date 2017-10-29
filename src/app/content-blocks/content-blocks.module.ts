import { ContentBlockComponent } from '../content-block/content-block.component';
import { CoreModule } from '../core/core.module';
import { BlockZipperComponent } from './block-zipper/block-zipper.component';
import { BlockPageHeaderComponent } from './block-page-header/block-page-header.component';
import { BlockMarkdownComponent } from './block-markdown/block-markdown.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownDirective } from './directives/markdown.directive';
import { BlockSectionComponent } from './block-section/block-section.component';

export const contentComponents = [
  BlockMarkdownComponent,
  BlockPageHeaderComponent,
  BlockZipperComponent,
  BlockSectionComponent
];

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [
    ContentBlockComponent,
    ...contentComponents,
    MarkdownDirective
  ],
  entryComponents: contentComponents,
  exports: [ContentBlockComponent]
})
export class ContentBlocksModule { }
