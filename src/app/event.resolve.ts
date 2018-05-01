import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EventResolve implements Resolve<any> {
  constructor(
    private contentful: ContentfulService,
    private router: Router) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    let event: any;
    let lang: string;

    if (!route.params.lang) {
      // TODO: Maybe populate based on backend supported languages?
      lang = navigator.language.slice(0, 2);
    } else {
      lang = route.params.lang;
    }

    if (route.params.event === 'news') {
      event = await this.contentful.getEventMetadata();
      this.router.navigate([`/${lang}/${event.name}`, 'news']);
    } else {
      event = await this.contentful.getEventMetadata(route.params.event);
      if (!route.params.event && event)
        this.router.navigate([`/${lang}/${event.name}`]);
    }

    return event;
  }
}
