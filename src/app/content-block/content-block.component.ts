import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { find } from 'lodash';
import { contentComponents } from '../content-blocks/content-components';

@Component({
  selector: 'asm-content-block',
  template: '<ng-template #contentTemplate></ng-template>',
  styles: ['']
})
export class ContentBlockComponent implements OnInit {
  @Input() content: any = {};
  @ViewChild('contentTemplate', { read: ViewContainerRef, static: true }) contentTemplate: ViewContainerRef;

  constructor(private cfResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    const contentType = this.content.__typename;
    if (!contentType) return;
    const ComponentClass = find(contentComponents,
      component => component.blockName === contentType);
    if (!ComponentClass) return;
    const blockComponentFactory = this.cfResolver.resolveComponentFactory(ComponentClass);
    const blockComponent = this.contentTemplate.createComponent(blockComponentFactory);
    blockComponent.instance['content'] = this.content;
  }
}
