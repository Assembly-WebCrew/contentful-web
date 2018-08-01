import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlockZipperContentComponent } from './block-zipper-content.component';
import { ContentfulService } from '../../core/contentful.service';
import { MarkdownDirective } from '../directives/markdown.directive';

describe('BlockZipperContentComponent', () => {
  let component: BlockZipperContentComponent;
  let fixture: ComponentFixture<BlockZipperContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockZipperContentComponent, MarkdownDirective ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => of({ menus: [{title: 'Main Menu', items: []}] }) }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockZipperContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
