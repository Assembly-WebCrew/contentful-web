import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get, join } from 'lodash';
import * as qs from 'qs';

@Injectable()
export class ContentResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    const slug = join(route.url,"/"), 
          params = { 'fields.slug': slug || 'frontpage', limit: 1 };
    const response = await this.contentful.query<any>({
      query: gql`
        {
          pages(q: "${qs.stringify(params)}") {
            slug
            title
            isFrontpage
            tags{
              title
            }
            featuredImage{
              title
              url
            }
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
                  content
                  image{
                    title
                    url
                  }
                  icon
                  learnMoreLink
                }
              }
              ... on BlockMarkdown {
                title
                body
                featuredImage{
                  title
                  url
                }
              }
              ... on BlockCollapse {
                title
                content
              }
              ... on BlockSection {
                title
                items{
                  ... on BlockMarkdown {
                    title
                    body
                    featuredImage{
                      title
                      url
                    }
                  }
                }
                featuredImage{
                  title
                  url
                }
              }
              ... on BlockSponsors {
                title
              }
            }
          }
        }`
    });
    return get(response, 'data.pages[0]');
  }
}
