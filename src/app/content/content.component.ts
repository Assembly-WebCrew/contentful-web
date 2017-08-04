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
  content: any;

  constructor(
    private route: ActivatedRoute,
    private cfResolver: ComponentFactoryResolver,
    private title: Title) {}

  ngOnInit() {
    this.content = this.route.snapshot.data.content;
    this.title.setTitle(this.content.title);
  }
}
