import { TestBed, inject } from '@angular/core/testing';

import { CreatePasswordService } from './create-password.service';

describe('CreatePasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePasswordService]
    });
  });

  it('should be created', inject([CreatePasswordService], (service: CreatePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
