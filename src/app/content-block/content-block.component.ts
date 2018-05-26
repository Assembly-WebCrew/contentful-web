import { contentComponents } from '../content-blocks/content-blocks.module';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { find } from 'lodash';

@Component({
  selector: 'asm-content-block',
  template: '<ng-template #contentTemplate></ng-template>',
  styles: ['']
})
export class ContentBlockComponent implements OnInit {
  @Input() content: any = {};
  @ViewChild('contentTemplate', { read: ViewContainerRef }) contentTemplate: ViewContainerRef;

  constructor(private cfResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const contentType = this.content.__typename;
    if (!contentType) return;
    const ComponentClass = find(contentComponents,
      component => component.blockName === contentType);
    const blockComponentFactory = this.cfResolver.resolveComponentFactory(ComponentClass);
    const blockComponent = this.contentTemplate.createComponent(blockComponentFactory);
    blockComponent.instance['content'] = this.content;
  }
}
