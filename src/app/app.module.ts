import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiClientResolve } from './api-client.resolve';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { BaseComponent } from './content/base/base.component';
import { ContentComponent } from './content/content.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { MobileMenuComponent } from './header/mobile-menu/mobile-menu.component';
import { NewsArchiveComponent } from './news/news-archive/news-archive.component';
import { NewsArticleResolve } from './news/news-article.resolve';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { SkeletorComponent } from './skeletor/skeletor.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    AppRoutingModule
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
export class AppModule {}
