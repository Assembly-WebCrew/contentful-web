import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-block-call-to-action',
  templateUrl: './block-call-to-action.component.html',
  styleUrls: ['./block-call-to-action.component.scss']
})
export class BlockCallToActionComponent implements OnInit {
  static blockName = 'CallToAction';

  content: any = {};
  link: string;

  constructor(private contentful: ContentfulService) { }

  ngOnInit() {
    this.link = this.getLink();
  }

  getLink() {
    if (this.content) {
      if (this.content.page) {
        return `/${this.contentful.getEvent().name}/${this.content.page.slug}`;
      } else if (this.content.url) {
        return this.content.url;
      }
    }
    return '';
  }
}
