import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionSchedulerComponent } from './restriction-scheduler.component';

describe('RestrictionSchedulerComponent', () => {
  let component: RestrictionSchedulerComponent;
  let fixture: ComponentFixture<RestrictionSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictionSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
