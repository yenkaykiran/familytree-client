import { TestBed, inject } from '@angular/core/testing';

import { GothramService } from './gothram.service';

describe('GothramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GothramService]
    });
  });

  it('should be created', inject([GothramService], (service: GothramService) => {
    expect(service).toBeTruthy();
  }));
});
