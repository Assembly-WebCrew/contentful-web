import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Component, OnInit, ComponentFactoryResolver,
  ViewContainerRef, ChangeDetectionStrategy, ViewChild, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import gql from 'graphql-tag';
import { HttpClient, HttpParams } from '@angular/common/http';
import { last, get } from 'lodash';
import { environment } from '../../environments/environment';

@Component({
  selector: 'asm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild('content', { read: ViewContainerRef }) private content;

  constructor(
    private route: ActivatedRoute,
    private cfResolver: ComponentFactoryResolver,
    private title: Title) {}

  ngOnInit() {
    console.log(this.route.snapshot.data.content);
    /* // Read the content from the route snapshot ('content' is the name of the resolve)
    const content = this.activatedRoute.snapshot.data['content'] || {};

    console.log(content);

    // Find the ComponentClass of the desired pageComponent (based on template)
    // const ComponentClass = contentComponents.get(content['type']);
    // if (!ComponentClass) return;

    this.title.setTitle(content.title);

    // Resolve the ComponentFactory
    const pageComponentFactory = this.cfResolver.resolveComponentFactory(ArticleComponent);

    // Create the component, attach it to the viewContainer and bind the data
    const pageComponent = this.content.createComponent(pageComponentFactory);
    pageComponent.instance['content'] = content; */
  }
}
