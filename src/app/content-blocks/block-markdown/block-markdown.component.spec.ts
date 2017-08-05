import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMarkdownComponent } from './block-markdown.component';

describe('BlockMarkdownComponent', () => {
  let component: BlockMarkdownComponent;
  let fixture: ComponentFixture<BlockMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
