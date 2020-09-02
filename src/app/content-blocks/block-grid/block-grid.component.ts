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
  filters: string[] = [];
  activeFilters = new Set<string>();
  pages = [];

  constructor(
    private contentful: ContentfulService) { }

  ngOnInit(): void {
    this.pages = this.content.pages.slice();
    const filters = [];
    if (this.pages && this.pages.length) {
      this.pages.forEach(page => {
        if (page.tags && page.tags.length) {
          filters.push(...page.tags.map(tag => tag.title));
        }
      });
    }
    this.filters = Array.from(new Set(filters).values());
  }

  getUrl(slug?: string): string {
    if (slug) {
      return `/${this.contentful.getEvent().name}/${slug}`;
    } else {
      return '';
    }
  }

  onToggleFilter(filter: string) {
    if (this.activeFilters.has(filter)) {
      this.activeFilters.delete(filter);
    } else {
      this.activeFilters.add(filter);
    }
    this.pages = this.content.pages.filter(page => {
      return this.activeFilters.size === 0 || (page.tags && page.tags.some(tag => this.activeFilters.has(tag.title)));
    });
  }
}
