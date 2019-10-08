import { ContentfulEntity } from './contentful-entity.interface';
import { Page } from './page.interface';

export interface MainMenu {
  data?: {
    menus?: Menu[]
  };
}

export interface Menu extends ContentfulEntity {
  highlights?: MenuHighlight[];
  items?: [MenuItem | Menu];
  label?: string;
  page?: MenuItem;
  title: string;
  sys: EntrySys;

  // internal
  hasLink: boolean;
  link: string;
}

export interface MenuHighlight extends ContentfulEntity {
  icon?: string;
  item: MenuItem;
  title: string;
  sys: EntrySys;
}

export interface MenuItem extends ContentfulEntity {
  page?: Page;
  title: string;
  url?: string;
  show?: boolean;
  sys: EntrySys;

  // internal
  hasLink: boolean;
  link: string;
}

interface EntrySys {
  id: string;
}
