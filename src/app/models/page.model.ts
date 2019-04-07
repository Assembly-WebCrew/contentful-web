class ContentfulEntity {
  __typename: string;
}


export class Page extends ContentfulEntity {
  contentBlocks: any;
  excludeSitemap: boolean;
  featuredImage: any;
  isFrontpage: boolean;
  parentPage: Page;
  slug: string;
  tags: any; // Tag[]
  title: string;
}
