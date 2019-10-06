import { ContentfulEntity } from './contentful-entity.interface';
import { Page } from './page.interface';

export interface Menu extends ContentfulEntity {
  highlights?: MenuHighlights[];
  items?: [MenuItem | Menu];
  label?: string;
  page?: MenuItem;
  title: string;
}

export interface MenuHighlights extends ContentfulEntity {
  icon?: string;
  item: MenuItem;
  title: string;
}

export interface MenuItem extends ContentfulEntity {
  page?: Page;
  title: string;
  url?: string;
  show?: boolean;
}
