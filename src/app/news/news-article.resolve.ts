import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import { ContentfulService } from '../core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get, values } from 'lodash';
import * as qs from 'qs';

@Injectable()
export class NewsArticleResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
      console.log(route, state)
    const event = route.data.event;
    const params = route.params.article ? { 'fields.slug': route.params.article, limit: 1 } : { 'fields.event': event && event.name || '', 'fields.published': true };
    // const response = await this.contentful.query<any>({
    //   query: gql`
    //     {
    //       newsItems(q: "${qs.stringify(params)}") {
    //         slug
    //         title
    //         tags
    //         body
    //         ingress
    //         published
    //         event
    //         category
    //       }
    //     }`
    // });

    // return route.params.article ? get(response, 'data.newsItems[0]') : get(response, 'data.newsItems');

    const articles = { // TODO: contentful backend support for news space....
      test: {
        slug: "test",
        title: "Test - ASSEMBLY Summer 2018 - Thu-Sun 2.–5.8.2018",
        ingress: "ASSEMBLY Winter 2018 is done, thank you for participating! it’s time to turn our eyes towards the summer! The next Assembly is only a few months away, and tickets will be out in April! Save the date and update your setups, Summer is just around the corner! ",
        body: "# Tickets\n\nTickets will be available for large groups starting 7th of April and everyone on 8th of April! Earlybird discounts are valid until early June.\n\n__See you at Assembly Summer 2018!__",
        published: true,
        onFrontpage: true,
        event: "Summer18",
        category: "General",
        date: new Date()
      },
      'assembly-summer-2018': {
        slug: "assembly-summer-2018",
        title: "ASSEMBLY Summer 2018 - Thu-Sun 2.–5.8.2018",
        ingress: "ASSEMBLY Winter 2018 is done, thank you for participating! it’s time to turn our eyes towards the summer! The next Assembly is only a few months away, and tickets will be out in April! Save the date and update your setups, Summer is just around the corner! ",
        body: "# Tickets\n\nTickets will be available for large groups starting 7th of April and everyone on 8th of April! Earlybird discounts are valid until early June.\n\n__See you at Assembly Summer 2018!__",
        published: true,
        onFrontpage: true,
        event: "Summer18",
        category: "General",
        date: new Date()
      }
    };

    return route.params.article ? articles[route.params.article] : values(articles);
  }
}
