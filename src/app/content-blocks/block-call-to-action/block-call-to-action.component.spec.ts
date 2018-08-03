import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlockCallToActionComponent } from './block-call-to-action.component';
import { ContentfulService } from '../../core/contentful.service';

describe('BlockCallToActionComponent', () => {
  let component: BlockCallToActionComponent;
  let fixture: ComponentFixture<BlockCallToActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCallToActionComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => of({ }) }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
