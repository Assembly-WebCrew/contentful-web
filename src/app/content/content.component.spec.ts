import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContentComponent } from './content.component';
import { ContentBlockComponent } from '../content-block/content-block.component';
import { BlockCountdownComponent } from '../content-blocks/block-countdown/block-countdown.component';
import { BlockEventInfoComponent } from '../content-blocks/block-event-info/block-event-info.component';
import { BlockSponsorsComponent } from '../content-blocks/block-sponsors/block-sponsors.component';
import { ContentfulService } from '../core/contentful.service';
import { BaseComponent } from './base/base.component';
import { WINDOW_PROVIDERS } from '../core/window.service';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [
        ContentBlockComponent,
        ContentComponent,
        BlockCountdownComponent,
        BlockEventInfoComponent,
        BlockSponsorsComponent,
        BaseComponent
      ],
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
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
