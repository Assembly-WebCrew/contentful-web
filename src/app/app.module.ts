import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { ContentBlockComponent } from './content-block/content-block.component';
import { ApiClientResolve } from './api-client.resolve';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { CustomReuseStrategy } from './router-reuse-strategy';
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
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics, Angulartics2GoogleTagManager])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiClientResolve,
    NewsArticleResolve
    /* {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
