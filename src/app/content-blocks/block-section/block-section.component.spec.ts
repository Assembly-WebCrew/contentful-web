import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSectionComponent } from './block-section.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';

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
});
