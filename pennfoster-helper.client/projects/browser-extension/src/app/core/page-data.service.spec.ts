import { TestBed } from '@angular/core/testing';

import { PageData } from './page-data.service';

describe('PageData', () => {
  let service: PageData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
