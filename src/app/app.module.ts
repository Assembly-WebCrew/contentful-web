import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { ApiClientResolve } from './api-client.resolve';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ANGULARTICS2_TOKEN } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { EventComponent } from './event/event.component';
import { SkeletorComponent } from './skeletor/skeletor.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { MenuComponent } from './header/menu/menu.component';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';
import { MobileMenuComponent } from './header/mobile-menu/mobile-menu.component';
import { NewsArchiveComponent } from './news/news-archive/news-archive.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { BaseComponent } from './content/base/base.component';
import { NewsArticleResolve } from './news/news-article.resolve';
import { DatePipe } from '@angular/common';
import { AnalyticsModule } from './analytics/analytics.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventComponent,
    ContentComponent,
    SkeletorComponent,
    SocialMediaComponent,
    MenuComponent,
    SponsorsPageComponent,
    MobileMenuComponent,
    NewsArchiveComponent,
    NewsArticleComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ContentBlocksModule,
    AppRoutingModule,
    AnalyticsModule.forRoot([
      {
        provide: ANGULARTICS2_TOKEN,
        useValue: {
          providers: [Angulartics2GoogleTagManager],
          settings: {}
        }
      }
    ]),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DatePipe,
    ApiClientResolve,
    NewsArticleResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
