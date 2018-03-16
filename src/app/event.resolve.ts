import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EventResolve implements Resolve<any> {
  constructor(
    private contentful: ContentfulService,
    private router: Router) {}

  public async resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<any> {
    const event = await this.contentful.getEventMetadata(route.params.event);
    if (!route.params.event && event)
      this.router.navigate([`/${event.name}`]);
    return event;
  }
}
