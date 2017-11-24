import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSponsorsComponent } from './block-sponsors.component';
import { ContentfulService } from '../../core/contentful.service';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';

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
          useValue: { query$: () => Observable.of({ sponsors: [{}]}) }
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
