import { ContentBlockComponent } from '../content-block/content-block.component';
import { CoreModule } from '../core/core.module';
import { BlockZipperComponent } from './block-zipper/block-zipper.component';
import { BlockZipperContentComponent } from './block-zipper-content/block-zipper-content.component';
import { BlockPageHeaderComponent } from './block-page-header/block-page-header.component';
import { BlockMarkdownComponent } from './block-markdown/block-markdown.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownDirective } from './directives/markdown.directive';
import { BlockSectionComponent } from './block-section/block-section.component';
import { BlockCountdownComponent } from './block-countdown/block-countdown.component';
import { BlockEventInfoComponent } from './block-event-info/block-event-info.component';
import { BlockSponsorsComponent } from './block-sponsors/block-sponsors.component';

export const contentComponents = [
  BlockMarkdownComponent,
  BlockPageHeaderComponent,
  BlockZipperComponent,
  BlockZipperContentComponent,
  BlockSectionComponent,
  BlockSponsorsComponent
];

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [
    ContentBlockComponent,
    ...contentComponents,
    BlockEventInfoComponent,
    BlockCountdownComponent,
    MarkdownDirective
  ],
  entryComponents: contentComponents,
  exports: [
    BlockEventInfoComponent,
    BlockCountdownComponent,
    ContentBlockComponent,
    BlockSponsorsComponent,
    MarkdownDirective
  ]
})
export class ContentBlocksModule { }
