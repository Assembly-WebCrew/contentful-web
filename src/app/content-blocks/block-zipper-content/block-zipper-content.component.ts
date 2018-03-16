import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asm-block-zipper-content',
  templateUrl: './block-zipper-content.component.html',
  styleUrls: ['./block-zipper-content.component.scss']
})
export class BlockZipperContentComponent implements OnInit{
  content: any = {};
  image: string;

  ngOnInit() {
    this.image = this.getImage();
  }

  getImage() {
    if (this.content && this.content.image)
      return 'url(' + this.content.image.url + ')';
  }
}
