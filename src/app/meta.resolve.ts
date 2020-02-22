import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ContentfulService } from './core/contentful.service';
import { AsmEvent } from './core/interfaces/event.interface';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable()
export class MetaResolve implements Resolve<any> {
  images: string[] = [
    '/assets/images/assembly-generic-image-1.jpg',
    '/assets/images/assembly-generic-image-2.jpg',
    '/assets/images/assembly-generic-image-3.jpg',
    '/assets/images/assembly-generic-image-4.jpg',
    '/assets/images/assembly-generic-image-5.jpg',
    '/assets/images/assembly-generic-image-6.jpg',
    '/assets/images/assembly-generic-image-7.jpg',
    '/assets/images/assembly-generic-image-8.jpg',
  ];
  isBrowser: boolean;

  constructor(private contentful: ContentfulService,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) platformId: string) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  public async resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    this.setMetaTags(state.url, route.data);
    return true;
  }

  public setMetaTags(url: string, data?: any) {
    const event: AsmEvent = this.contentful.getEvent();
    let title = event.eventTitle || 'Assembly';
    let origin = '';
    if (this.isBrowser) {
      origin = location.origin;
    }
    let image = origin + this.images[Math.floor(Math.random() * 8)];
    let description = 'Assembly is a bi-annual computer festival, esports event, demoscene and lan party in Helsinki, Finland.';
    let type = 'website';
    let publishedDate = '';

    if (url.indexOf('/partners') !== -1) {
      title = 'Partners - ' + event.eventTitle;
    } else if (url.indexOf('/news') !== -1) {
      if (data && data.title) {
        title = data.title + ' - ' + event.eventTitle;
        if (data.featuredImage) {
          image = data.featuredImage.url;
        }
        if (data.ingress) {
          description = data.ingress;
        }
      } else {
        title = 'News - ' + event.eventTitle;
      }
      if (data && data.date ) {
        publishedDate = data.date;
      }
      type = 'article';
    } else if (data && data.title) {
      title = data.title + ' - ' + event.eventTitle;
      if (data.featuredImage) {
        image = data.featuredImage.url;
      }
    }
    this.meta.updateTag({ property: 'og:site_name', content: event.eventTitle });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'twitter:title', content: title });
    this.title.setTitle(title);

    this.meta.updateTag({ property: 'og:image', content: image, id: 'og-image' }, 'id="og-image"');

    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:url', content: 'https://www.assembly.org' + url });

    this.meta.updateTag({ property: 'og:type', content: type});

    if (publishedDate !== '') { this.meta.updateTag({ property: 'og:published_time', content: publishedDate }); }
  }
}
