import { TestBed } from '@angular/core/testing';

import { JdkTokenService } from '../jdk-token.service';

describe('JdkTokenService', () => {
  let service: JdkTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JdkTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
