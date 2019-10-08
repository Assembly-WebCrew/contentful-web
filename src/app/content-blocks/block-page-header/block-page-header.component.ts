import { Component } from '@angular/core';
import { ContentfulService } from '../../core/contentful.service';
import { CallToAction } from '../../core/interfaces/call-to-action.interface';

@Component({
  selector: 'asm-block-page-header',
  templateUrl: './block-page-header.component.html',
  styleUrls: ['./block-page-header.component.scss']
})
export class BlockPageHeaderComponent {
  static blockName = 'BlockPageHeader';

  content: any = {};

  constructor(private contentful: ContentfulService) {}

  getLink(cta: CallToAction): string {
    if (cta) {
      if (cta.page) {
        return `/${this.contentful.getEvent().name}/${cta.page.slug}`;
      } else if (cta.url) {
        return cta.url;
      }
    }
    return '';
  }
}
