import { contentComponents } from '../content-blocks/content-blocks.module';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { find } from 'lodash';

@Component({
  selector: 'asm-content-block',
  template: '<ng-template #content></ng-template>',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent implements OnInit {
  @Input() content;
  @ViewChild('content', { read: ViewContainerRef }) contentTemplate: ViewContainerRef;

  constructor(private cfResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log(this.content);
    const contentType = this.content.__typename;
    const ComponentClass = find(contentComponents,
      component => component.name === `${contentType}Component`);
    const blockComponentFactory = this.cfResolver.resolveComponentFactory(ComponentClass);
    const blockComponent = this.contentTemplate.createComponent(blockComponentFactory);
    blockComponent.instance['content'] = this.content;
  }
}
