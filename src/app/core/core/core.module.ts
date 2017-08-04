import { HttpClientModule } from '@angular/common/http';
import { ContentfulService } from '../contentful.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ContentfulService
  ]
})
export class CoreModule { }
