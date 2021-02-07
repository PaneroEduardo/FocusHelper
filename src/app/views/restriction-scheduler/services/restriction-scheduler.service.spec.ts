/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestrictionSchedulerService } from './restriction-scheduler.service';

describe('Service: RestrictionScheduler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestrictionSchedulerService]
    });
  });

  it('should ...', inject([RestrictionSchedulerService], (service: RestrictionSchedulerService) => {
    expect(service).toBeTruthy();
  }));
});
