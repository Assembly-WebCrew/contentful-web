import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletorComponent } from './skeletor.component';

describe('SkeletorComponent', () => {
  let component: SkeletorComponent;
  let fixture: ComponentFixture<SkeletorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
