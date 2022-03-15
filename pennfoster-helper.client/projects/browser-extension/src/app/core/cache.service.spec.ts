import { TestBed } from '@angular/core/testing';

import { Cache } from './cache.service';

describe('Cache', () => {
  let service: Cache;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cache);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
