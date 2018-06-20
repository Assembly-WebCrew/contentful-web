import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-block-page-header',
  templateUrl: './block-page-header.component.html',
  styleUrls: ['./block-page-header.component.scss']
})
export class BlockPageHeaderComponent implements OnInit {
  static blockName = 'BlockPageHeader';

  content: any = {};

  constructor(private contentful: ContentfulService) {}

  ngOnInit() {
  }

  getLink(cta) {
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
