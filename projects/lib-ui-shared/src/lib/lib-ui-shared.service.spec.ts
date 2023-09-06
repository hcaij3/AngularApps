import { TestBed } from '@angular/core/testing';

import { LibUiSharedService } from './lib-ui-shared.service';

describe('LibUiSharedService', () => {
  let service: LibUiSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibUiSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
