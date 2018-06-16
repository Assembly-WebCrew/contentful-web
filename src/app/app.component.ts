import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

@Component({
  selector: 'asm-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {
  constructor(
    angulartics2GoogleTagManager: Angulartics2GoogleTagManager) { }
}
