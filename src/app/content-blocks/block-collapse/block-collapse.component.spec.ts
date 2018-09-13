import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCollapseComponent } from './block-collapse.component';
import { MarkdownDirective } from '../directives/markdown.directive';

describe('BlockCollapseComponent', () => {
  let component: BlockCollapseComponent;
  let fixture: ComponentFixture<BlockCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCollapseComponent, MarkdownDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('toggle()', () => {
    it('should change opened state', () => {
      expect(component.opened).toBeFalsy();
      component.toggle();
      expect(component.opened).toBeTruthy();
      component.toggle();
      expect(component.opened).toBeFalsy();
    });
  });
});
