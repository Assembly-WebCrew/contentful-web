import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { ContentfulService } from '../core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get, last } from 'lodash';
import * as qs from 'qs';

@Injectable()
export class NewsArticleResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService) {}

  public async resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<any> {

    const params = { 'fields.slug': route.params.article, limit: 1 };

    const response = await this.contentful.query<any>({
      query: gql`
        {
          newsArticles(q: "${qs.stringify(params)}") {
            slug
            title
            tags{
              title
            }
            body
            publishTime
          }
        }`
      });

    return get(response, 'data.newsArticles[0]');
  }
}
