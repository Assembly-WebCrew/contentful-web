import { HttpClientModule } from '@angular/common/http';
import { ContentfulService } from '../core/contentful.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletorComponent } from './skeletor.component';
import { SocialMediaComponent } from '../social-media/social-media.component';

describe('SkeletorComponent', () => {
  let component: SkeletorComponent;
  let fixture: ComponentFixture<SkeletorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [
        SkeletorComponent,
        HeaderComponent,
        FooterComponent,
        SocialMediaComponent
      ],
      providers: [ContentfulService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
