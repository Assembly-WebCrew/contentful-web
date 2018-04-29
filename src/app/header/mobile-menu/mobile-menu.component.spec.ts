import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuComponent } from './mobile-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentfulService } from '../../core/contentful.service';
import { Observable } from 'rxjs/Observable';

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MobileMenuComponent ],
      providers:  [       {
        provide: ContentfulService,
        useValue: { query$: () => Observable.of({ menus: [{title: 'Main Menu', items: []}] }) }
      }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
