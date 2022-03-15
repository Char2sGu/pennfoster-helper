import { TestBed } from '@angular/core/testing';

import { Weegy } from './weegy.service';

describe('Weegy', () => {
  let service: Weegy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Weegy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
