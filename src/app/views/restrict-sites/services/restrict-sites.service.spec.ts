import { TestBed } from '@angular/core/testing';

import { RestrictSitesService } from './restrict-sites.service';

describe('RestrictSitesService', () => {
  let service: RestrictSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestrictSitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
