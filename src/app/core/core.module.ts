import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContentfulService } from './contentful.service';
import { WINDOW_PROVIDERS } from './window.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ContentfulService,
    WINDOW_PROVIDERS
  ]
})
export class CoreModule { }
