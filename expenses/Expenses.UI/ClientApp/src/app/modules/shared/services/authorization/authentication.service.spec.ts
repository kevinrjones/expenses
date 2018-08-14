import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { UserManager } from 'oidc-client';
import { asyncData } from '../../../../testing/helpers';
import { LocalStorageService } from '../local-storage.service';
import { LoggingService } from '../logging.service';
import { WindowsService } from '../windows.service';
import { AuthenticationService, getClientSettings } from './authentication.service';

describe('AuthenticationService', () => {
  let userManager: UserManager;
  let localStorage: LocalStorageService;
  let windowService: WindowsService;
  let authenticationService: AuthenticationService;

  localStorage = jasmine.createSpyObj('localStorage', ['setItem', 'getItem']);
  windowService = jasmine.createSpyObj('windowsService', ['redirect']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        UserManager,
        {
          provide: LocalStorageService,
          useValue: localStorage
        },
        {
          provide: WindowsService,
          useValue: windowService
        },
        {
          provide: LoggingService,
          useValue: jasmine.createSpyObj('logger', ['info', 'error'])
        }
      ]
    });
    userManager = TestBed.get(UserManager);
  });

  beforeEach(inject([AuthenticationService], (service: AuthenticationService) => {
    authenticationService = service;
  }));

  it('should be created', () => {
    spyOn(userManager, 'getUser').and.returnValue(
      asyncData({
        profile: {}
      })
    );
    expect(authenticationService).toBeTruthy();
  });

  it('should return the user profile', fakeAsync(() => {
    spyOn(userManager, 'getUser').and.returnValue(
      asyncData({
        profile: {}
      })
    );
    tick();
    authenticationService.getClaims().subscribe(claims => {
      expect(claims).toBeTruthy();
    });
    tick();
  }));

  it('should not be logged in when the user has expired', fakeAsync(() => {
    spyOn(userManager, 'getUser').and.returnValue(
      asyncData({
        profile: {},
        expired: true
      })
    );
    tick();
    authenticationService.isLoggedIn().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalsy();
    });
    tick();
  }));

  it('should be logged in when the user has not expired', fakeAsync(() => {
    spyOn(userManager, 'getUser').and.returnValue(
      asyncData({
        profile: {},
        expired: false
      })
    );
    tick();
    authenticationService.isLoggedIn().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTruthy();
    });
    tick();
  }));

  it('should return the correct token', fakeAsync(() => {
    spyOn(userManager, 'getUser').and.returnValue(
      asyncData({
        profile: {},
        token_type: 'type',
        access_token: 'token'
      })
    );
    authenticationService.getAuthorizationHeaderValue().subscribe(token => expect(token).toBe('type token'));
  }));

  describe('startAuthentication', () => {

    it('should set the href in local storage', fakeAsync(() => {
      spyOn(userManager, 'signinRedirect').and.returnValue(asyncData({}));
      authenticationService.startAuthentication().subscribe(() => expect(localStorage.setItem).toHaveBeenCalled());
        tick();
      })
    );

    it('should call signin redirect on the user manager', fakeAsync(() => {
        spyOn(userManager, 'signinRedirect').and.returnValue(asyncData({}));
        authenticationService.startAuthentication().subscribe(() => expect(userManager.signinRedirect).toHaveBeenCalled());
        tick();
      })
    );
  });

  describe('startSignout', () => {

    it('should call signin redirect on the user manager', fakeAsync(() => {
        spyOn(userManager, 'signoutRedirect').and.returnValue(asyncData({}));
        authenticationService.startSignout().subscribe(() => expect(userManager.signoutRedirect).toHaveBeenCalled());
        tick();
      })
    );
  });

  describe('completeAuthentication', () => {

    it('should redirect when finished', fakeAsync(() => {
      spyOn(userManager, 'signinRedirectCallback').and.returnValue(Promise.resolve({}));
      authenticationService.completeAuthentication().subscribe(() => expect(localStorage.getItem).toHaveBeenCalled());
        tick();
      })
    );

    it('should call signin redirect on the user manager', fakeAsync(() => {
        spyOn(userManager, 'signinRedirectCallback').and.returnValue(Promise.resolve({}));
        authenticationService.completeAuthentication().subscribe(() => expect(windowService.redirect).toHaveBeenCalled());
        tick();
      })
    );
  });
  describe('completeSignout', () => {

    it('should call signin redirect on the user manager', fakeAsync(() => {
        spyOn(userManager, 'signoutRedirectCallback').and.returnValue(Promise.resolve({}));
        authenticationService.completeSignout().subscribe(() => expect(windowService.redirect).toHaveBeenCalled());
        tick();
      })
    );
  });

  describe('getCLientSettings', () => {
    it('shouuld return the settings', () => {
      expect(getClientSettings()).toBeTruthy();
    });
  });
});
