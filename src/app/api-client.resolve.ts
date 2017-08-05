import { ContentfulService } from './core/contentful.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ApiClientResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService) {}

  public async resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<void> {
    await this.contentful.initialize(route.params.event);
  }
}
