import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleService, Schedule } from '../services/schedule.service';

import { BlockScheduleComponent } from './block-schedule.component';
import { BlockScheduleEventComponent } from '../block-schedule-event/block-schedule-event.component';
import { Observable } from 'rxjs';

describe('BlockScheduleComponent', () => {
  let component: BlockScheduleComponent;
  let fixture: ComponentFixture<BlockScheduleComponent>;
  let scheduleServiceStub = {
    getJSON: () => Observable.of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockScheduleComponent, BlockScheduleEventComponent ],
      providers: [
        {
          provide: ScheduleService,
          useValue: scheduleServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
