import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticleComponent } from './news-article.component';
import { BaseComponent } from '../../content/base/base.component';
import { BlockEventInfoComponent } from '../../content-blocks/block-event-info/block-event-info.component';
import { BlockCountdownComponent } from '../../content-blocks/block-countdown/block-countdown.component';
import { BlockSponsorsComponent } from '../../content-blocks/block-sponsors/block-sponsors.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentfulService } from '../../core/contentful.service';
import { Observable } from 'rxjs/Observable';
import { WINDOW_PROVIDERS } from '../../core/window.service';
import { MarkdownDirective } from '../../content-blocks/directives/markdown.directive';

describe('NewsArticleComponent', () => {
  let component: NewsArticleComponent;
  let fixture: ComponentFixture<NewsArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NewsArticleComponent, BaseComponent, BlockCountdownComponent, BlockEventInfoComponent, BlockSponsorsComponent, MarkdownDirective ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => Observable.of({ sponsors: [{}]}), getEvent: () => ({name: 'summer18', eventTitle: 'ASSEMBLY Summer 2018'}) }
        },
        WINDOW_PROVIDERS
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
