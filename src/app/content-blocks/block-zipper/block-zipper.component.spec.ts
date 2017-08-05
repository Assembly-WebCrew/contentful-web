import { ContentBlockComponent } from '../../content-block/content-block.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockZipperComponent } from './block-zipper.component';

describe('BlockZipperComponent', () => {
  let component: BlockZipperComponent;
  let fixture: ComponentFixture<BlockZipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentBlockComponent, BlockZipperComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockZipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
