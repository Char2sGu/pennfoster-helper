import { TestBed } from '@angular/core/testing';

import { PageContent } from './page-content.service';

describe('PageContent', () => {
  let service: PageContent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageContent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
