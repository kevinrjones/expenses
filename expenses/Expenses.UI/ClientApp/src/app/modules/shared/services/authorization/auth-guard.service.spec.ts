import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { UserManager } from 'oidc-client';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../../../../node_modules/@angular/router';
import { asyncData, asyncError } from '../../../../testing/helpers';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

describe('AuthGuardService', () => {
  const mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  let authService: AuthenticationService;
  let component: AuthGuardService;
  let routerStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    const userManaer = jasmine.createSpyObj('userManager', ['getUser']);
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        AuthenticationService,
        UserManager,
        {
          provide: RouterStateSnapshot,
          useValue: mockSnapshot
        }
      ]
    });
    authService = TestBed.get(AuthenticationService);
    component = TestBed.get(AuthGuardService);
    routerStateSnapshot = TestBed.get(RouterStateSnapshot);
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    spyOn(authService, 'isLoggedIn').and.returnValue(asyncData(true));
    expect(service).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should return true when the user is logged in', fakeAsync(() => {
      spyOn(authService, 'isLoggedIn').and.returnValue(asyncData(true));
      component.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot).subscribe(res => {
        expect(res).toBe(true);
      });
      tick();
    }));

    it('should return false when the user is not logged in', fakeAsync(() => {
      spyOn(authService, 'isLoggedIn').and.returnValue(asyncData(false));
      spyOn(authService, 'startAuthentication').and.stub();
      component.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot).subscribe(res => {
        expect(res).toBe(false);
      });
      tick();
    }));

    it('should call startAuthentication when the user is not logged in', fakeAsync(() => {
      spyOn(authService, 'isLoggedIn').and.returnValue(asyncData(false));
      spyOn(authService, 'startAuthentication').and.stub();
      component.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot).subscribe(res => {
        expect(authService.startAuthentication).toHaveBeenCalled();
      });
      tick();
    }));
    it('should return false when the an exception is thrown', fakeAsync(() => {
      spyOn(authService, 'isLoggedIn').and.returnValue(asyncError(false));
      spyOn(authService, 'startAuthentication').and.stub();
      component.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot).subscribe(res => {
        expect(res).toBe(false);
      });
      tick();
    }));

    it('should call startAuthentication when an exception is thrown', fakeAsync(() => {
      spyOn(authService, 'isLoggedIn').and.returnValue(asyncError(false));
      spyOn(authService, 'startAuthentication').and.stub();
      component.canActivate(new ActivatedRouteSnapshot(), routerStateSnapshot).subscribe(res => {
        expect(authService.startAuthentication).toHaveBeenCalled();
      });
      tick();
    }));
  });
});
