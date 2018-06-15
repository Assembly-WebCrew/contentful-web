import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AnalyticsModule } from './analytics/analytics.module';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AnalyticsModule.forRoot([Angulartics2GoogleAnalytics, Angulartics2GoogleTagManager])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
