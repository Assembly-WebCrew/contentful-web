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
    //         featuredImage{
    //           title
    //           url
    //         }
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
        body: "# Tickets\n\nTickets will be available for large groups starting 7th of April and everyone on 8th of April! Earlybird discounts are valid until early June.\n\n# Program\n\n \n\n## Democompos\n\nThe compo rules and deadlines will be out by March latest, but we do know all the old compos are in. Whether your dream is to make graphics, music, a game, something wild or the golden grail of demo, it’s time to get to work! We also have 64k intro back for this year, let’s see what kind of entries we are going to get!\n\n \n\n## Professional eSports\n\nPro tournaments will be back for the Summer! As soon as the tournament schedule for this year is in shape, we’ll be revealing the games! We can promise OW & CS:GO will be there plus the FInnish national championships as well.\n\n \n\n## Casual eSports\n\nWhat’s a lan party without BYOC games? The hottest games will be held at Assembly, so get your team together. Be prepared to challenge your friends with OW, CS:GO, SC2, LOL, HS and most probably in PUBG too!\n\n \n\n## IS Streamcorner\n\nStreamcorner has been super popular during the last few years and we will be bringing it again to this upcoming Summer event. We will tell you more about the hosts and guests later on.\n\n \n\n## Seminars\n\nWant to learn something new? The seminar area hosts professionals and creators showing and telling about their specialties.\n\n \n\n\n\n## Supplementary program\n\nEven though Assembly has a lot of big things going on, there’s even more out there to fill your weekend. We’ll keep you posted on updates as the spring marches on, but there’s a lot planned!\n\n \n\nWe can’t promise much yet, but at least speedruns, machine dance, boardgames, robo wars, and a possible artist are on the radar. We’re also always looking for more program to make sure you can’t get bored!\n\n\n\n__See you at Assembly Summer 2018!__",
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
