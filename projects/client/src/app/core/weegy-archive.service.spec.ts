import { TestBed } from '@angular/core/testing';

import { WeegyArchiveService } from './weegy-archive.service';

describe('WeegyArchiveService', () => {
  let service: WeegyArchiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeegyArchiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
