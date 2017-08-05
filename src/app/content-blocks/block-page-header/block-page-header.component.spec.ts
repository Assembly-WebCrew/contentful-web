import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPageHeaderComponent } from './block-page-header.component';

describe('BlockPageHeaderComponent', () => {
  let component: BlockPageHeaderComponent;
  let fixture: ComponentFixture<BlockPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
