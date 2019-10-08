import { Page } from './page.interface';

export interface CallToAction {
  page?: Page;
  url?: string;
  title?: string;
  linkLabel?: string;
}
