import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title, Meta } from '@angular/platform-browser';
import { ContentfulService } from './core/contentful.service';

@Injectable()
export class MetaResolve implements Resolve<any> {
  constructor(private contentful: ContentfulService,
    private title: Title,
    private meta: Meta) { }

  public async resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {

    if (state.url.indexOf("/partners")) {
      this.title.setTitle('Partners - ' + this.contentful.getEvent().eventTitle);
    }
    this.meta.updateTag({ property: 'og:site_name', content: this.contentful.getEvent().eventTitle });
    return true;
  }
}
