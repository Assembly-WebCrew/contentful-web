import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/contentful.service';

@Component({
  selector: 'asm-block-grid',
  templateUrl: './block-grid.component.html',
  styleUrls: ['./block-grid.component.scss']

})
export class BlockGridComponent implements OnInit {
  static blockName = 'BlockGrid';

  content: any = {};
  filters = [];

  constructor(
    private contentful: ContentfulService) { }

  ngOnInit(): void {
    // TODO: implement filters using tags
  }

  getUrl(slug?: string): string {
    if (slug) {
      return `/${this.contentful.getEvent().name}/${slug}`;
    } else {
      return '';
    }
  }
}
