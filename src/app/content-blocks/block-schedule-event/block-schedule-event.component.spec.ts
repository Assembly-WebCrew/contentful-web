import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockScheduleEventComponent } from './block-schedule-event.component';

describe('BlockScheduleEventComponent', () => {
  let component: BlockScheduleEventComponent;
  let fixture: ComponentFixture<BlockScheduleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockScheduleEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockScheduleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
