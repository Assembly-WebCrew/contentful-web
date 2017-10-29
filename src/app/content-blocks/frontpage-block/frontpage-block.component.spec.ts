import { ContentBlockComponent } from '../../content-block/content-block.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMoreBlockComponent } from './frontpage-block.component';

describe('LearnMoreBlockComponent', () => {
  let component: LearnMoreBlockComponent;
  let fixture: ComponentFixture<LearnMoreBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentBlockComponent, LearnMoreBlockComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnMoreBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
