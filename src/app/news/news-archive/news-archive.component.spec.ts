import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NewsArchiveComponent } from './news-archive.component';
import { BaseComponent } from '../../content/base/base.component';
import { BlockEventInfoComponent } from '../../content-blocks/block-event-info/block-event-info.component';
import { BlockCountdownComponent } from '../../content-blocks/block-countdown/block-countdown.component';
import { BlockSponsorsComponent } from '../../content-blocks/block-sponsors/block-sponsors.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentfulService } from '../../core/contentful.service';
import { WINDOW_PROVIDERS } from '../../core/window.service';

describe('NewsArchiveComponent', () => {
  let component: NewsArchiveComponent;
  let fixture: ComponentFixture<NewsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NewsArchiveComponent, BaseComponent, BlockCountdownComponent, BlockEventInfoComponent, BlockSponsorsComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => of({ sponsors: [{}]}), getEvent: () => ({name: 'summer18', eventTitle: 'ASSEMBLY Summer 2018'}) }
        },
        WINDOW_PROVIDERS
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
