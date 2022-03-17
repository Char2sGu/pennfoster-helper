import { TestBed } from '@angular/core/testing';

import { WeegyService } from './weegy.service';

describe('WeegyService', () => {
  let service: WeegyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeegyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
