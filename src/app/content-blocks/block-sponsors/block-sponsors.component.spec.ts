import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSponsorsComponent } from './block-sponsors.component';

describe('BlockSponsorsComponent', () => {
  let component: BlockSponsorsComponent;
  let fixture: ComponentFixture<BlockSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
