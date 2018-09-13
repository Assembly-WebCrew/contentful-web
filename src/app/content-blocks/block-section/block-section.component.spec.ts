import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlockComponent } from '../../content-block/content-block.component';
import { BlockSectionComponent } from './block-section.component';

describe('BlockSectionComponent', () => {
  let component: BlockSectionComponent;
  let fixture: ComponentFixture<BlockSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockSectionComponent, ContentBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should change hasBackground to true', () => {
      expect(component.hasBackground).toBeFalsy();
      component.content.featuredImage = {
        'url': 'image.jpg'
      };
      component.ngOnInit();
      expect(component.hasBackground).toBeTruthy();
    });
   });

});
