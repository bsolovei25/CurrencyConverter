import { TestBed } from '@angular/core/testing';

import { FixerApiService } from './fixer-api.service';

describe('FixerApiService', () => {
  let service: FixerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
