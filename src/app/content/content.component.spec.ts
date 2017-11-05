import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentBlockComponent } from '../content-block/content-block.component';
import { BlockCountdownComponent } from '../content-blocks/block-countdown/block-countdown.component';
import { BlockEventInfoComponent } from '../content-blocks/block-event-info/block-event-info.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ContentBlockComponent, ContentComponent, BlockCountdownComponent, BlockEventInfoComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
