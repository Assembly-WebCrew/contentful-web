import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleService } from '../services/schedule.service';
import { BlockScheduleEventComponent } from './block-schedule-event.component';

import { DatePipe } from '@angular/common';
import { ScheduleEvent } from '../../core/models/schedule-event.model';

describe('BlockScheduleEventComponent', () => {
  let component: BlockScheduleEventComponent;
  let fixture: ComponentFixture<BlockScheduleEventComponent>;
  const scheduleServiceStub = {
    getCategoryIcon: () => '',
    fixTimes: () => {},
    fixTime: () => Date
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockScheduleEventComponent ],
      providers: [
        {
          provide: ScheduleService,
          useValue: scheduleServiceStub
        },
        DatePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockScheduleEventComponent);
    component = fixture.componentInstance;

    component.event = new ScheduleEvent();
    component.event.start_time = new Date();
    component.event.original_start_time = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
