import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { BlockSponsorsComponent } from './block-sponsors.component';
import { ContentfulService } from '../../core/contentful.service';

describe('BlockSponsorsComponent', () => {
  let component: BlockSponsorsComponent;
  let fixture: ComponentFixture<BlockSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockSponsorsComponent ],
      imports: [HttpClientModule],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => of({ sponsors: [{}]}) }
        }
      ]
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
