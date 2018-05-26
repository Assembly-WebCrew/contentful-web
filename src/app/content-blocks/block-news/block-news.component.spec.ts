import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockNewsComponent } from './block-news.component';
import { ContentfulService } from '../../core/contentful.service';
import { Observable } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlockNewsComponent', () => {
  let component: BlockNewsComponent;
  let fixture: ComponentFixture<BlockNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BlockNewsComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query: () => Promise.resolve({ data: { newsItems: []}}), getEvent: () => ({name:"summer18"}) }
        } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
