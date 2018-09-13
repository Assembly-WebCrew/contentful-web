import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ContentfulService } from '../../core/contentful.service';
import { BlockCallToActionComponent } from './block-call-to-action.component';

describe('BlockCallToActionComponent', () => {
  let component: BlockCallToActionComponent;
  let fixture: ComponentFixture<BlockCallToActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCallToActionComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => of({ sponsors: [{}]}), getEvent: () => ({name: 'summer18', eventTitle: 'ASSEMBLY Summer 2018'}) }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.content.title = 'title';
    component.content.linkLabel = 'label';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const elementDe: DebugElement = fixture.debugElement.query(By.css('.cta-title'));
    const elementNa: HTMLElement = elementDe.nativeElement;
    expect(elementNa.textContent).toContain('title');
  });

  it('should display title', () => {
    const elementDe: DebugElement = fixture.debugElement.query(By.css('.cta-link'));
    const elementNa: HTMLElement = elementDe.nativeElement;
    expect(elementNa.textContent).toContain('label');
  });

  describe('getLink()', () => {
    beforeEach(() => {
      component.content.title = 'title';
      component.content.linkLabel = 'label';
      fixture.detectChanges();
    });

    it('should return empty string when no content', () => {
      component.content = null;
      const link = component.getLink();
      expect(link).toEqual('');
    });

    it('should return empty string when no content.page or content.page.url', () => {
      const link = component.getLink();
      expect(link).toEqual('');
    });

    it('should return content.page.url when no content.page ', () => {
      component.content.url = 'http://google.com';
      const link = component.getLink();
      expect(link).toEqual(component.content.url);
    });

    it('should return full page url', () => {
      component.content.page = {
        'slug': 'demoscene'
      };
      const link = component.getLink();
      expect(link).toEqual('/summer18/demoscene');
    });
  });

  describe('ngOnInit()', () => {
    it('should get component.link', () => {
      component.content.page = {
        'slug': 'demoscene'
      };
      expect(component.link).toBe('');
      component.ngOnInit();
      expect(component.link).toEqual('/summer18/demoscene');
    });
  });
});
