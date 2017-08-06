import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get, last } from 'lodash';
import * as qs from 'qs';

@Injectable()
export class ContentResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService) {}

  public async resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<any> {

    const slug = get(last(route.url), 'path', 'frontpage'),
      params = { 'fields.slug': slug, limit: 1 };

    const response = await this.contentful.query<any>({
      query: gql`
        {
          pages(q: "${qs.stringify(params)}") {
            slug
            title
            contentBlocks{
              ... on BlockPageHeader {
                title
                callToAction {
                  ... on CallToAction {
                    title
                    url
                    linkLabel
                  }
                }
              }
              ... on BlockZipper {
                title
                topics {
                  title
                  body
                }
              }
              ... on BlockMarkdown {
                title
                body
              }
            }
          }
        }`
      });

    return get(response, 'data.pages[0]');
  }
}
