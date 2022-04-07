import { TestBed } from '@angular/core/testing';

import { WeegyOnlineService } from './weegy-online.service';

describe('WeegyOnlineService', () => {
  let service: WeegyOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeegyOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
