import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-block-zipper-content',
  templateUrl: './block-zipper-content.component.html',
  styleUrls: ['./block-zipper-content.component.scss']
})
export class BlockZipperContentComponent implements OnInit {
  static blockName = 'BlockZipperContent';

  content: any = {};
  image: string;
  link: string;
  icon: string;

  constructor(private contentful: ContentfulService) {}

  ngOnInit(): void {
    this.image = this.getImage() || '';
    this.link = this.getLink();
    this.icon = this.getIcon();
  }

  getIcon(): string {
    if (this.content && this.content.icon) {
      return this.content.icon;
    } else {
      return 'angle-double-right';
    }
  }

  getImage(): string {
    if (this.content && this.content.image) {
      return 'url(' + this.content.image.url + ')';
    } else
     return 'url(\'/assets/images/assembly-generic-image-1.jpg\')';
  }

  getLink(): string {
    if (this.content) {
      if (this.content.linkToPage) {
        return `/${this.contentful.getEvent().name}/${this.content.linkToPage.slug}`;
      }
      if (this.content.learnMoreLink) {
        return this.content.learnMoreLink;
      }
    }
    return '';
  }
}
