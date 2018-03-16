import { Observable } from 'rxjs/Rx';
import { WatchQueryOptions } from 'apollo-client/core/watchQueryOptions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher, NetworkStatus } from 'apollo-client';
import { environment } from '../../environments/environment';

@Injectable()
export class ContentfulService {
  private client: ApolloClient;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  private async getContentfulSchema(event): Promise<any> {
    return this.http.get(`${environment.apiUrl}/${event.name}/schema`).toPromise();
  }

  async getEventMetadata(name?: string): Promise<any> {
    const event = await this.http.get(`${environment.apiUrl}/event` ,
      name && { params: new HttpParams().set('name', name) } ).toPromise();
    return event;
  }

  async initialize(eventName?: string) {
    if (this.client) return;

    try {
      const event = await this.getEventMetadata(eventName),
        fragmentMatcher = new IntrospectionFragmentMatcher({
          introspectionQueryResultData: await this.getContentfulSchema(event)
        });

      this.client = new ApolloClient({
        networkInterface: createNetworkInterface({
          uri: `${environment.apiUrl}/en/${event.name}/graphql`
        }),
        fragmentMatcher
      });
    } catch(e) {
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
