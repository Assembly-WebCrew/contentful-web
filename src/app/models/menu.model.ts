import { Page } from './page.model';

class ContentfulEntity {
  __typename: string;
}


export class Menu extends ContentfulEntity {
  items?: [MenuItem | Menu];
  label?: string;
  page?: MenuItem;
  title: string;
  highlights?: MenuHighlights[];
}

export class MenuHighlights extends ContentfulEntity {
  icon?: string;
  item: MenuItem;
  title: string;
}

export class MenuItem extends ContentfulEntity {
  page?: Page;
  title: string;
  url?: string;
}
