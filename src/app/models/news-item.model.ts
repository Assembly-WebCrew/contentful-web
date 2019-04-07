export class NewsItem {
  body: string;
  category: string;
  date: Date;
  featuredImage: NewsFeaturedImage;
  ingress: string;
  onFrontpage: boolean;
  published: boolean;
  slug: string;
  tags: string[];
  title: string;
}

export class NewsFeaturedImage {
  title: string;
  url: string;
}
