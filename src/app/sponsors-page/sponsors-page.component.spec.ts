import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsPageComponent } from './sponsors-page.component';
import { ContentfulService } from '../core/contentful.service';

describe('SponsorsPageComponent', () => {
  let component: SponsorsPageComponent;
  let fixture: ComponentFixture<SponsorsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsPageComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query: () => Promise.resolve({ data: { sponsors: [{}]}}) }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
