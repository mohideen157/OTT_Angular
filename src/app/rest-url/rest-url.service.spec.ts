import { TestBed } from '@angular/core/testing';

import { RestUrlService } from './rest-url.service';

describe('RestUrlService', () => {
  let service: RestUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
