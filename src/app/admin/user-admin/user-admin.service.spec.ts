import { TestBed, inject } from '@angular/core/testing';

import { UserAdminService } from './user-admin.service';

describe('UserAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAdminService]
    });
  });

  it('should be created', inject([UserAdminService], (service: UserAdminService) => {
    expect(service).toBeTruthy();
  }));
});
