import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleService, Schedule } from '../services/schedule.service';
import { BlockScheduleEventComponent } from './block-schedule-event.component';
import { formatDate} from '@angular/common';

import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('Content-blocks: BlockScheduleEventComponent', () => {
  let component: BlockScheduleEventComponent;
  let fixture: ComponentFixture<BlockScheduleEventComponent>;
  const scheduleServiceStub = {
    getCategoryIcon: () => ''
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Text show correctly', () => {

    beforeEach(() => {
      component.event = {
        'categories': ['Event'],
        'end_time': '2018-08-02T10:00+0300',
        'flags': ['major', 'onsite'],
        'key': 'summer18-2001',
        'location_key': 'all_areas',
        'name_fi': 'ASSEMBLY Summer 2018 alkaa!',
        'name': 'ASSEMBLY Summer 2018 starts!',
        'original_start_time': '2018-08-02T10:00+0300',
        'start_time': '2018-08-02T10:00+0300',
      };
      component.locations = {
        'all_areas': {
          'name_fi': 'Kaikki alueet',
          'name': 'All Areas',
          'url': 'http://www.assembly.org/summer18/manual/maps/',
        },
        'stage': {
          'name_fi': 'P\u00e4\u00e4lava',
          'url': 'http://www.assembly.org/summer18/manual/maps/',
          'name': 'Main Stage'
        }
      };
      fixture.detectChanges();
    });

    it('it should display correct event name', () => {
      const titleDe = fixture.debugElement.query(By.css('.title'));
      const titleEl = titleDe.nativeElement;
      expect(titleEl.innerText).toBe('ASSEMBLY Summer 2018 starts!');

      component.event.name = 'Doors close';
      fixture.detectChanges();
      expect(titleEl.innerText).toBe(component.event.name);
    });

    it('it should display correct start time', () => {
      const elementDe = fixture.debugElement.query(By.css('.start-time'));
      const elementEl = elementDe.nativeElement;
      expect(elementEl.innerText).toBe('10:00');

      component.event.start_time = '2018-08-02T12:30+0300';
      fixture.detectChanges();
      expect(elementEl.innerText).toBe(formatDate(component.event.start_time, 'HH:mm', 'en'));
    });

    it('it should display correct event location', () => {
      const elementDe = fixture.debugElement.query(By.css('.location'));
      const elementEl = elementDe.nativeElement;
      expect(elementEl.innerText).toContain('All Areas');

      component.event.location_key = 'stage';
      fixture.detectChanges();
      expect(elementEl.innerText).toContain('Main Stage');
    });

    // it('reschedule', () => {});

  });
});
