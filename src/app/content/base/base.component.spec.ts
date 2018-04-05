import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { BlockEventInfoComponent } from '../../content-blocks/block-event-info/block-event-info.component';
import { BlockCountdownComponent } from '../../content-blocks/block-countdown/block-countdown.component';
import { WINDOW_PROVIDERS } from '../../core/window.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseComponent, BlockCountdownComponent, BlockEventInfoComponent ],
      imports: [RouterTestingModule],
      providers: [
        WINDOW_PROVIDERS
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
