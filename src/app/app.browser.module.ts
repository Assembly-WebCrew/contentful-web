import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'asm-web'
    }),
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
