import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { authGuard } from './auth-guard';

describe('authGuard (standalone)', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['salvarToken', 'isAuthenticatedAsync']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  function runGuard() {
    const route = {} as any;
    const state = {} as any;
    return authGuard(route, state);
  }

  it('should allow activation when user is authenticated', async () => {
    authServiceSpy.salvarToken.and.returnValue(Promise.resolve());
    authServiceSpy.isAuthenticatedAsync.and.returnValue(Promise.resolve(true));

    const result = await runGuard();
    expect(result).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should block activation and redirect when user is not authenticated', async () => {
    authServiceSpy.salvarToken.and.returnValue(Promise.resolve());
    authServiceSpy.isAuthenticatedAsync.and.returnValue(Promise.resolve(false));

    const result = await runGuard();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should handle errors and redirect to login', async () => {
    authServiceSpy.salvarToken.and.returnValue(Promise.reject('error'));

    const result = await runGuard();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});