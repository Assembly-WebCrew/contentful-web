import { QueryOptions } from 'apollo-client/core/watchQueryOptions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ApolloClient, NetworkStatus } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { environment } from '../../environments/environment';
import { AsmEvent } from './interfaces/event.interface';
import { MenuItem } from './interfaces/menu.interface';
import { onError } from 'apollo-link-error';

@Injectable()
export class ContentfulService {
  // TODO: Add proper typing for ApolloClient cache
  private client: ApolloClient<any>;
  private event: AsmEvent;
  private retry = 0;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  // get Contentful Schema from api / backend
  private async getContentfulSchema(event: AsmEvent): Promise<any> {
    return this.http.get(`${environment.apiUrl}/${event.name}/schema`).toPromise().catch(
      (error: any) => {
        console.log(error);
      }
    );
  }

  // get event
  getEvent(): AsmEvent {
    return this.event;
  }

  // get event metadata from backend
  async getEventMetadata(name?: string): Promise<any> {
    const event: any = await this.http.get(`${environment.apiUrl}/event`,
      name && { params: new HttpParams().set('name', name) }).toPromise().catch(e => console.log(e));
    // Only public events are requestable on production mode
    if (environment.production && !event.isPublic) {
      throw new Error(`Requested event '${name}' is not valid`);
    }
    return event;
  }

  // get landing page events metadata from backend
  async getEvents(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/events`).toPromise().catch(
      (error: any) => {
        console.log(error);
      });
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

      const httpLink = new HttpLink({ uri: `${environment.apiUrl}/en/${this.event.name}/graphql` });
      const link = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.warn(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
            ),
          );

        if (networkError) console.error(`[Network error]: ${networkError}`);
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
    } catch (e) {
      console.warn(e);
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
    if (!this.client) throw new Error(
      'Make sure that ContentfulService has been initialized before calling .query');
    return this.client.query<T, unknown>(options);
  }

  query$<T>(options: QueryOptions): Observable<T> {
    return from(this.query<T>(options)
      .then(result => result.data));
  }
}
