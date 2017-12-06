import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { ContentBlockComponent } from './content-block/content-block.component';
// import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { ApiClientResolve } from './api-client.resolve';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { CustomReuseStrategy } from './router-reuse-strategy';
import { EventComponent } from './event/event.component';
import { SkeletorComponent } from './skeletor/skeletor.component';
import { LearnMoreBlockComponent } from './content-blocks/learn-more-block/learn-more-block.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { MenuComponent } from './header/menu/menu.component';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventComponent,
    ContentComponent,
    SkeletorComponent,
    LearnMoreBlockComponent,
    SocialMediaComponent,
    MenuComponent,
    SponsorsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ContentBlocksModule,
    AppRoutingModule
  ],
  providers: [
    ApiClientResolve
    /* {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
