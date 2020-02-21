import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContentBlockComponent } from "../content-block/content-block.component";
import { CoreModule } from "../core/core.module";
import { BlockCollapseComponent } from "./block-collapse/block-collapse.component";
import { BlockCountdownComponent } from "./block-countdown/block-countdown.component";
import { BlockEventInfoComponent } from "./block-event-info/block-event-info.component";
import { BlockScheduleComponent } from "./block-schedule/block-schedule.component";
import { BlockSponsorsComponent } from "./block-sponsors/block-sponsors.component";
import { MarkdownDirective } from "./directives/markdown.directive";
import { ScheduleService } from "./services/schedule.service";
import { BlockScheduleEventComponent } from "./block-schedule-event/block-schedule-event.component";
import { contentComponents } from "./content-components";

@NgModule({
  imports: [CommonModule, CoreModule, RouterModule],
  declarations: [
    ContentBlockComponent,
    ...contentComponents,
    BlockEventInfoComponent,
    BlockCountdownComponent,
    MarkdownDirective,
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
  providers: [ScheduleService]
})
export class ContentBlocksModule {}
