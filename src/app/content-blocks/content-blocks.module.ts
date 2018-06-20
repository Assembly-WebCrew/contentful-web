import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentBlockComponent } from '../content-block/content-block.component';
import { CoreModule } from '../core/core.module';
import { BlockCollapseComponent } from './block-collapse/block-collapse.component';
import { BlockCountdownComponent } from './block-countdown/block-countdown.component';
import { BlockEventInfoComponent } from './block-event-info/block-event-info.component';
import { BlockMarkdownComponent } from './block-markdown/block-markdown.component';
import { BlockNewsComponent } from './block-news/block-news.component';
import { BlockPageHeaderComponent } from './block-page-header/block-page-header.component';
import { BlockScheduleComponent } from './block-schedule/block-schedule.component';
import { BlockSectionComponent } from './block-section/block-section.component';
import { BlockSponsorsComponent } from './block-sponsors/block-sponsors.component';
import { BlockZipperContentComponent } from './block-zipper-content/block-zipper-content.component';
import { BlockZipperComponent } from './block-zipper/block-zipper.component';
import { MarkdownDirective } from './directives/markdown.directive';
import { ScheduleService } from './services/schedule.service';
import { BlockScheduleEventComponent } from './block-schedule-event/block-schedule-event.component';

export const contentComponents = [
  BlockMarkdownComponent,
  BlockPageHeaderComponent,
  BlockZipperComponent,
  BlockZipperContentComponent,
  BlockSectionComponent,
  BlockSponsorsComponent,
  BlockCollapseComponent,
  BlockNewsComponent,
  BlockScheduleComponent
];

@NgModule({
  imports: [CommonModule, CoreModule, RouterModule],
  declarations: [
    ContentBlockComponent,
    ...contentComponents,
    BlockEventInfoComponent,
    BlockCountdownComponent,
    MarkdownDirective,
    BlockScheduleComponent,
    BlockScheduleEventComponent
  ],
  entryComponents: contentComponents,
  exports: [
    BlockEventInfoComponent,
    BlockCountdownComponent,
    ContentBlockComponent,
    BlockSponsorsComponent,
    MarkdownDirective,
    BlockCollapseComponent,
    BlockScheduleComponent
  ],
  providers: [
    ScheduleService
  ]
})
export class ContentBlocksModule { }
