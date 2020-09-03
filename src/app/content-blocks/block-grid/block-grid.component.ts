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

  getFilterIcon(filter: string): string {
    let icon = '';
    if (filter) {
      const tag = filter.toString().toLowerCase();
      if (tag === 'esports') {
        icon = 'fa-gamepad';
      } else if (tag === 'demoscene') {
        icon = 'fa-plug';
      } else if (tag === 'creative') {
        icon = 'fa-lightbulb-o ';
      } else if (tag === 'activation') {
        icon = 'fa-users';
      } else if (tag === 'open stage') {
        icon = 'fa-bullhorn';
      }
    }
    return icon;
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
