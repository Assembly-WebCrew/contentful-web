import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'asm-block-section',
  templateUrl: './block-section.component.html',
  styleUrls: ['./block-section.component.scss']
})
export class BlockSectionComponent implements OnInit {
  static blockName = 'BlockSection';

  content: any = {};
  id: string;
  @HostBinding('class.has-background') hasBackground: boolean;

  constructor() { }

  ngOnInit(): void {
    if (this.content.featuredImage && this.content.featuredImage.url) {
      this.hasBackground = true;
    }
    if (this.content.title) {
      this.id = this.content.title.replace(/\s/gi, '-').replace(/[^\w-]/gi, '').toLowerCase();
    }
  }

  @HostBinding('style.background-image') get backgroundImage() {
    return this.content.featuredImage ? 'url(' + this.content.featuredImage.url + ')' : '';
  }

}
