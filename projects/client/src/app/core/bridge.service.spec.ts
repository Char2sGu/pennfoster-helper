import { TestBed } from '@angular/core/testing';

import { Bridge } from './bridge.service';

describe('Bridge', () => {
  let service: Bridge;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bridge);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
