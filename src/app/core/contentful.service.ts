import { Observable } from 'rxjs/Rx';
import { WatchQueryOptions } from 'apollo-client/core/watchQueryOptions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Event as RouterEvent, ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher, NetworkStatus } from 'apollo-client';
import { environment } from '../../environments/environment';

@Injectable()
export class ContentfulService {

  private activeLang: string;
  private activeEvent: string;
  private clients: { [event: string]: { [lang: string]: ApolloClient } } = {};
  private event: { name: string };

  constructor(
    private http: HttpClient,
    private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof ActivationEnd) {
        this.activeLang = event.snapshot.params.lang || 'en';
        this.activeEvent = event.snapshot.params.event;
        console.log('new route state', this.activeLang, this.activeEvent);
      }
    });
  }

  // get Contentful Schema from api / backend
  private async getContentfulSchema(event): Promise<any> {
    return this.http.get(`${environment.apiUrl}/${event.name}/schema`).toPromise();
  }

  private getEventApiClient(): ApolloClient {
    const eventClients = this.clients[this.activeEvent];
    if (!eventClients) {
      return undefined;
    }
    return eventClients[this.activeLang];
  }

  // get event
  getEvent() {
    return this.event;
  }

  // get active language
  getActiveLang () {
    return this.activeLang;
  }

  setActiveLang(lang) {
    this.activeLang = lang;
    this.activeEvent = this.event.name;
  }

  // get event metadata from backend
  async getEventMetadata(name?: string): Promise<any> {
    return await this.http.get(`${environment.apiUrl}/event`,
      name && { params: new HttpParams().set('name', name) }).toPromise();
  }

  // get page url
  getUrl(item) {
    if (item.page) {
      return `/${this.activeLang}/${this.event.name}/${item.page.slug}`;
    } else {
      if (item.url && item.url[0] === '/') {
        return `/${this.activeLang}/${this.event.name}${item.url}`;
      }
      return item.url || '';
    }
  }

  // navigate to page
  onNavigation(item, event: Event) {
    const url: string = this.getUrl(item);

    if (url.startsWith('/')) {
      event.preventDefault();
      this.router.navigate([url]);
      return false;
    }
  }

  // initialize apollo-client
  async initialize(eventName?: string, lang?: string) {
    this.activeEvent = eventName;
    this.activeLang = lang;

    if (this.getEventApiClient()) return;

    try {
      this.event = await this.getEventMetadata(eventName);
      const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: await this.getContentfulSchema(this.event)
      });

      const eventClients = this.clients[this.event.name] = {};
      eventClients[this.activeLang] = new ApolloClient({
        networkInterface: createNetworkInterface({
          uri: `${environment.apiUrl}/${this.activeLang}/${this.event.name}/graphql`
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
    console.log('query', this.activeEvent, this.activeLang);
    const client = this.getEventApiClient();
    if (!client) throw new Error(
      'Make sure that ContentfulService has been initialized before calling .query');
    return client.query<T>(options);
  }

  query$<T>(options: WatchQueryOptions): Observable<T> {
    return Observable.fromPromise<T>(this.query<T>(options)
      .then(result => result.data));
  }
}
