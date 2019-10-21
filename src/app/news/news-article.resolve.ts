import gql from 'graphql-tag';
import { ContentfulService } from '../core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get } from 'lodash';
import { stringify as qsStringify } from 'qs';
import { MetaResolve } from '../meta.resolve';

@Injectable()
export class NewsArticleResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService,
    private meta: MetaResolve) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    const params = route.params.article ?
      { 'fields.slug': route.params.article, limit: 1 } :
      { 'fields.published': true };
    const response = await this.contentful.query<any>({
      query: gql`
        {
          newsItems(q: "${qsStringify(params)}") {
            date
            slug
            title
            tags
            body
            ingress
            published
            onFrontpage
            category
            featuredImage{
              title
              url
            }
          }
        }`
    });

    if (route.params.article) {
      const article = get(response, 'data.newsItems[0]');
      this.meta.setMetaTags(state.url, article);
      return article;
    } else {
      this.meta.setMetaTags(state.url);
      return get(response, 'data.newsItems');
    }
  }
}
