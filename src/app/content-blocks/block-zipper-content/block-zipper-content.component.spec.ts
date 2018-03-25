import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockZipperContentComponent } from './block-zipper-content.component';
import { ContentfulService } from '../../core/contentful.service';
import { Observable } from 'rxjs/Observable';

describe('BlockZipperContentComponent', () => {
  let component: BlockZipperContentComponent;
  let fixture: ComponentFixture<BlockZipperContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockZipperContentComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => Observable.of({ menus: [{title: "Main Menu", items: []}] }) }
        }
      ]
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
