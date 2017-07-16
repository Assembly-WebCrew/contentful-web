import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Component, OnInit, ComponentFactoryResolver,
  ViewContainerRef, ChangeDetectionStrategy, ViewChild, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { contentComponents } from '../content-types/content-types.module';
import gql from 'graphql-tag';
import { HttpClient, HttpParams } from '@angular/common/http';
import { last, get } from 'lodash';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'asm-content',
  template: '<ng-template #content></ng-template>',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild('content', { read: ViewContainerRef }) private content;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cfResolver: ComponentFactoryResolver,
    private title: Title) {}

  ngOnInit() {
    // Read the content from the route snapshot ('content' is the name of the resolve)
    const content = this.activatedRoute.snapshot.data['content'] || {};

    // Find the ComponentClass of the desired pageComponent (based on template)
    const ComponentClass = contentComponents.get(content['type']);

    if (!ComponentClass) return;

    this.title.setTitle(content.title);

    // Resolve the ComponentFactory
    const pageComponentFactory = this.cfResolver.resolveComponentFactory(ComponentClass);

    // Create the component, attach it to the viewContainer and bind the data
    const pageComponent = this.content.createComponent(pageComponentFactory);
    pageComponent.instance['content'] = content;
  }
}

@Injectable()
export class ContentResolve implements Resolve<any> {
  constructor(
    private http: HttpClient,
    private router: Router) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const eventName = get<string>(route.url[0], 'path'),
      pageSlug = route.url.length > 1 ? get<string>(last(route.url), 'path') : 'frontpage';

    const event = await this.http.get(`${environment.apiUrl}/event`,
      eventName && { params: new HttpParams().set('name', eventName) }).toPromise();

    if (!eventName) {
      console.log('No event name!');
      this.router.navigateByUrl(event['name']);
      return;
    }

    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: `${environment.apiUrl}/${eventName}/graphql`
      })
    });

    const response = await client.query<any>({
      query: gql`
        {
          pages(q: "fields.slug=${encodeURIComponent(pageSlug)}&limit=1") {
            slug
            type
            title
            body
          }
        }`
      });

    return get(response, ['data', 'pages', 0]);
  }
}
