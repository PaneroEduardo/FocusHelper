/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OptionsService } from './options.service';

describe('Service: Options', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionsService]
    });
  });

  it('should ...', inject([OptionsService], (service: OptionsService) => {
    expect(service).toBeTruthy();
  }));
});
