import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get, last } from 'lodash';

@Injectable()
export class ContentResolve implements Resolve<any> {

  public async resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<any> {

    const slug = get(last(route.url), 'path', 'frontpage');

    const client: ApolloClient = route.parent.data.apiClient;
    const response = await client.query<any>({
      query: gql`
        {
          pages(q: "fields.slug=${encodeURIComponent(slug)}&limit=1") {
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
