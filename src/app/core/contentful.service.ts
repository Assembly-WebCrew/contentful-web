import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher } from 'apollo-client';
import { environment } from '../../environments/environment';
import { get } from 'lodash';
import gql from 'graphql-tag';

@Injectable()
export class ContentfulService {
  constructor(
    private http: HttpClient) {}

  private async getContentfulSchema(event): Promise<any> {
    return this.http.get(`${environment.apiUrl}/${event.name}/schema`).toPromise();
  }

  async getEventMetadata(name?: string): Promise<any> {
    const event = await this.http.get(`${environment.apiUrl}/event` ,
      name && { params: new HttpParams().set('name', name) } ).toPromise();
    return event;
  }

  async initializeClient(eventName?: string) {
    const event = await this.getEventMetadata(eventName),
      fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: await this.getContentfulSchema(event)
      });

    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: `${environment.apiUrl}/en/${event.name}/graphql`
      }),
      fragmentMatcher
    });

    return client;
  }
}
