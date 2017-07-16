import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  content: any = {};

  constructor() { }

  ngOnInit() {
    console.log(this.content);
  }

}
