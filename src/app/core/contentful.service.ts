import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient, NetworkStatus, QueryOptions } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { GraphQLError } from 'graphql';
import { from, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AsmEvent } from './interfaces/event.interface';
import { MenuItem } from './interfaces/menu.interface';

@Injectable()
export class ContentfulService {
  // TODO: Add proper typing for ApolloClient cache
  private client: ApolloClient<any>;
  private event: AsmEvent;
  private retry = 0;

  private logError = (error: any): void => console.error(error);
  private throwError = (error: any): void => { throw new Error(error); };

  // get event
  public getEvent = (): AsmEvent => this.event;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  // get Contentful Schema from api / backend
  private async getContentfulSchema(event: AsmEvent): Promise<any> {
    return this.http.get(`${environment.apiUrl}/${event.name}/schema`).toPromise()
      .catch((error: any) => this.logError(error));
  }

  // get event metadata from backend
  async getEventMetadata(name?: string): Promise<any> {
    const event: any = await this.http.get(`${environment.apiUrl}/event`,
      name && { params: new HttpParams().set('name', name) }).toPromise()
      .catch((error: any) => this.logError(error));
    // Only public events are requestable on production mode
    if (environment.production && !event.isPublic) {
      this.throwError(`Requested event '${name}' is not valid`);
    }
    return event;
  }

  // get landing page events metadata from backend
  async getEvents(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/events`).toPromise()
      .catch((error: any) => this.logError(error));
  }

  // get page url
  getUrl(item: MenuItem): string {
    if (item.page) {
      return `/${this.event.name}/${item.page.slug}`;
    } else {
      if (item.url && item.url[0] === '/') {
        return `/${this.event.name}${item.url}`;
      }
      return item.url || '';
    }
  }

  onNavigation(item: MenuItem, event: Event): void {
    const url: string = this.getUrl(item);

    if (url.startsWith('/')) {
      event.preventDefault();
      this.router.navigate([url]);
    }
  }

  // initialize apollo-client
  async initialize(eventName?: string): Promise<void> {
    if (this.client) return;

    try {
      this.event = await this.getEventMetadata(eventName);
      const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: await this.getContentfulSchema(this.event)
      });

      const httpLink: HttpLink = new HttpLink({ uri: `${environment.apiUrl}/en/${this.event.name}/graphql` });

      const link: ApolloLink = onError(({ graphQLErrors, networkError }): void => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }: GraphQLError) => {
            this.logError(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`);
          });
        }
        if (networkError) {
          this.logError(`[Network error]: ${networkError}`);
        }
      });

      this.client = new ApolloClient({
        link: link.concat(httpLink),
        cache: new InMemoryCache({ fragmentMatcher }),
        defaultOptions: {
          watchQuery: {
            errorPolicy: 'all'
          },
          query: {
            errorPolicy: 'all'
          }
        }
      });
    } catch (error) {
      this.logError(error);
      if (this.retry > 1) return;
      this.retry++;
      this.router.navigate(['/']);
    }
  }

  async query<T>(options: QueryOptions): Promise<{
    data: T;
    loading: boolean;
    networkStatus: NetworkStatus;
    stale: boolean;
  }> {
    if (!this.client) {
      this.throwError('Make sure that ContentfulService has been initialized before calling .query');
    }
    return this.client.query<T, unknown>(options);
  }

  query$<T>(options: QueryOptions): Observable<T> {
    return from(this.query<T>(options)
      .then(result => result.data));
  }
}
