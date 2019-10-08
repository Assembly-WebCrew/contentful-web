import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AsmEvent } from './core/interfaces/event.interface';

@Injectable()
export class EventResolve implements Resolve<any> {
  constructor(
    private contentful: ContentfulService,
    private router: Router) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    let event: AsmEvent;
    if (route.params.event === 'news') {
      event = await this.contentful.getEventMetadata();
      this.router.navigate([`/${event.name}`, 'news']);
    } else if (route.params.event) {
      event = await this.contentful.getEventMetadata(route.params.event);
    } else {
      return this.contentful.getEvents();
    }

    return event;
  }
}
