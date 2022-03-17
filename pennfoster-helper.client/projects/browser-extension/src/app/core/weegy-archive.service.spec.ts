import { TestBed } from '@angular/core/testing';

import { WeegyArchive } from './weegy-archive.service';

describe('WeegyArchive', () => {
  let service: WeegyArchive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeegyArchive);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
