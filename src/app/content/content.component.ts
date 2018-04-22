import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Component, OnInit, ComponentFactoryResolver,
  ViewContainerRef, ChangeDetectionStrategy, ViewChild, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
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
  content: any = {};

  constructor(
    private route: ActivatedRoute,
    private cfResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getContent();
  }

  getContent(): void {
    this.route.data.subscribe((data: { content: any }) => {
      this.content = data.content || {};
    });
  }

}
