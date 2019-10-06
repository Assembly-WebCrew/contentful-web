export interface NewsItem {
  body?: string;
  category?: string;
  date?: Date;
  featuredImage?: NewsFeaturedImage;
  ingress?: string;
  onFrontpage?: boolean;
  published?: boolean;
  slug?: string;
  tags?: string[];
  title?: string;
}

export interface NewsFeaturedImage {
  title?: string;
  url?: string;
}
