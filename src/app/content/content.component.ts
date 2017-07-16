import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { contentComponents } from '../content-types/content-types.module';

@Component({
  selector: 'asm-content',
  template: '<ng-template #content></ng-template>',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild('content', { read: ViewContainerRef }) private content;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cfResolver: ComponentFactoryResolver,
    private title: Title) {}

  ngOnInit() {
    // Read the content from the route snapshot ('content' is the name of the resolve)
    const content = this.activatedRoute.snapshot.data['content'] || {};

    // Find the ComponentClass of the desired pageComponent (based on template)
    const ComponentClass = contentComponents.get(content['type']);

    if (!ComponentClass) return;

    this.title.setTitle(content.title);

    // Resolve the ComponentFactory
    const pageComponentFactory = this.cfResolver.resolveComponentFactory(ComponentClass);

    // Create the component, attach it to the viewContainer and bind the data
    const pageComponent = this.content.createComponent(pageComponentFactory);
    // pageComponent.instance['data'] = content.data;
  }
}
