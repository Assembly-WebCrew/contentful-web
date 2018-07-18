import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleService, Schedule } from '../services/schedule.service';

import { BlockScheduleComponent } from './block-schedule.component';
import { BlockScheduleEventComponent } from '../block-schedule-event/block-schedule-event.component';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlockScheduleComponent', () => {
  let component: BlockScheduleComponent;
  let fixture: ComponentFixture<BlockScheduleComponent>;
  const scheduleServiceStub = {
    getJSON: () => Observable.of({}),
    getCategoryIcon: () => ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockScheduleComponent, BlockScheduleEventComponent ],
      imports: [RouterTestingModule],
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
