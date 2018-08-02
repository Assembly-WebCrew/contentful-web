import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentfulService } from '../../core/contentful.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MenuComponent ],
      providers:  [       {
        provide: ContentfulService,
        useValue: { query$: () => of({ menus: [{title: 'Main Menu', items: []}] }) }
      }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
