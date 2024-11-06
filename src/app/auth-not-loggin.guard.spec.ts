import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authNotLogginGuard } from './auth-not-loggin.guard';

describe('authNotLogginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authNotLogginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
