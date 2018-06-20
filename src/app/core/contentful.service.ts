import { Observable } from 'rxjs/Rx';
import { WatchQueryOptions } from 'apollo-client/core/watchQueryOptions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher, NetworkStatus } from 'apollo-client';
import { environment } from '../../environments/environment';

@Injectable()
export class ContentfulService {
  private client: ApolloClient;
  private event: { name: string, eventTitle: string };

  constructor(
    private http: HttpClient,
    private router: Router) { }

  // get Contentful Schema from api / backend
  private async getContentfulSchema(event): Promise<any> {
    return this.http.get(`${environment.apiUrl}/${event.name}/schema`).toPromise();
  }

  // get event
  getEvent() {
    return this.event;
  }

  // get event metadata from backend
  async getEventMetadata(name?: string): Promise<any> {
    const event = await this.http.get(`${environment.apiUrl}/event`,
      name && { params: new HttpParams().set('name', name) }).toPromise();
    return event;
  }

  // get page url
  getUrl(item) {
    if (item.page) {
      return `/${this.event.name}/${item.page.slug}`;
    } else {
      if (item.url && item.url[0] === '/') {
        return `/${this.event.name}${item.url}`;
      }
      return item.url || '';
    }
  }

  onNavigation(item, event: Event) {
    const url: string = this.getUrl(item);

    if (url.startsWith('/')) {
      event.preventDefault();
      this.router.navigate([url]);
      return false;
    }
  }

  // initialize apollo-client
  async initialize(eventName?: string) {
    if (this.client) return;

    try {
      this.event = await this.getEventMetadata(eventName);
      const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: await this.getContentfulSchema(this.event)
      });

      this.client = new ApolloClient({
        networkInterface: createNetworkInterface({
          uri: `${environment.apiUrl}/en/${this.event.name}/graphql`
        }),
        fragmentMatcher
      });
    } catch (e) {
      this.router.navigate(['/']);
    }
  }

  async query<T>(options: WatchQueryOptions): Promise<{
    data: T;
    loading: boolean;
    networkStatus: NetworkStatus;
    stale: boolean;
  }> {
    if (!this.client) throw new Error(
      'Make sure that ContentfulService has been initialized before calling .query');
    return this.client.query<T>(options);
  }

  query$<T>(options: WatchQueryOptions): Observable<T> {
    return Observable.fromPromise<T>(this.query<T>(options)
      .then(result => result.data));
  }
}
