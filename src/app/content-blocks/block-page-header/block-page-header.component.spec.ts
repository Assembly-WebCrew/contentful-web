import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlockPageHeaderComponent } from './block-page-header.component';
import { ContentfulService } from '../../core/contentful.service';

describe('BlockPageHeaderComponent', () => {
  let component: BlockPageHeaderComponent;
  let fixture: ComponentFixture<BlockPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPageHeaderComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => of({ menus: [{title: 'Main Menu', items: []}] }) }
        }
      ]
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
