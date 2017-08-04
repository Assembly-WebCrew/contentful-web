import { ContentBlockComponent } from '../content-block/content-block.component';
import { CoreModule } from '../core/core.module';
import { BlockZipperComponent } from './block-zipper/block-zipper.component';
import { BlockPageHeaderComponent } from './block-page-header/block-page-header.component';
import { BlockMarkdownComponent } from './block-markdown/block-markdown.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const contentComponents = [
  BlockMarkdownComponent,
  BlockPageHeaderComponent,
  BlockZipperComponent
];

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [ContentBlockComponent, ...contentComponents],
  entryComponents: contentComponents,
  exports: [ContentBlockComponent]
})
export class ContentBlocksModule { }
