import gql from 'graphql-tag';
import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get, join } from 'lodash';
import { stringify as qsStringify } from 'qs';
import { MetaResolve } from './meta.resolve';

@Injectable()
export class ContentResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService,
    private meta: MetaResolve) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    const slug = join(route.url, '/'),
      params = { 'fields.slug': slug || 'frontpage', limit: 1 };
    const response = await this.contentful.query<any>({
      query: gql`
        {
          pages(q: "${qsStringify(params)}") {
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
                    page {
                      slug
                      title
                    }
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
                  linkToPage {
                    slug
                    title
                  }
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
              ... on BlockGrid {
                pages {
                  slug
                  title
                  tags {
                    title
                  }
                  featuredImage{
                    title
                    url
                  }
                }
              }
              ... on BlockSchedule {
                scheduleSource
                tag
              }
              ... on BlockCollapse {
                title
                content
              }
              ... on BlockSection {
                title
                items{
                  ... on BlockCollapse {
                    title
                    content
                  }
                  ... on BlockMarkdown {
                    title
                    body
                    featuredImage{
                      title
                      url
                    }
                  }
                  ... on CallToAction {
                    title
                    url
                    linkLabel
                    page {
                      slug
                      title
                    }
                  }
                  ... on BlockPageHeader {
                    title
                    callToAction {
                      ... on CallToAction {
                        title
                        url
                        linkLabel
                        page {
                          slug
                          title
                        }
                      }
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
              ... on BlockNews {
                title
                itemCount
                filterByCategory
                filterByTag
                frontpageFeaturedNewsOnly
              }
            }
          }
        }`
    });
    const page = get(response, 'data.pages[0]');
    if (page) {
      this.meta.setMetaTags(state.url, page);
    }
    return page;
  }
}
