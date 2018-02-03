import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockZipperContentComponent } from './block-zipper-content.component';

describe('BlockZipperContentComponent', () => {
  let component: BlockZipperContentComponent;
  let fixture: ComponentFixture<BlockZipperContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockZipperContentComponent ]
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
