import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsPageComponent } from './sponsors-page.component';
import { ContentfulService } from '../core/contentful.service';
import { BaseComponent } from '../content/base/base.component';
import { BlockEventInfoComponent } from '../content-blocks/block-event-info/block-event-info.component';
import { BlockCountdownComponent } from '../content-blocks/block-countdown/block-countdown.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WINDOW_PROVIDERS } from '../core/window.service';

describe('SponsorsPageComponent', () => {
  let component: SponsorsPageComponent;
  let fixture: ComponentFixture<SponsorsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      imports: [RouterTestingModule],
      declarations: [ SponsorsPageComponent, BaseComponent, BlockCountdownComponent, BlockEventInfoComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query: () => Promise.resolve({ data: { sponsors: [{}]}}) }
        },
        WINDOW_PROVIDERS
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
