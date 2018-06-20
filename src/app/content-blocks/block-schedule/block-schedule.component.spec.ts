import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockScheduleComponent } from './block-schedule.component';

describe('BlockScheduleComponent', () => {
  let component: BlockScheduleComponent;
  let fixture: ComponentFixture<BlockScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockScheduleComponent ]
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
