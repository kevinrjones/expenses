import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserManager } from 'oidc-client';
import { asyncData } from '../../../../testing/helpers';
import { AuthCallbackComponent } from '../../../authentication/components/auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from '../../../authentication/components/signout-callback/signout-callback.component';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { appRoutes } from '../../../router/app.routes';
import { LocalStorageService } from '../../services/local-storage.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { MainNavComponent } from './main-nav.component';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  const authnService = jasmine.createSpyObj('AuthenticationService', {
    startSignout: asyncData({}),
    startAuthentication: asyncData({}),
    isLoggedIn: asyncData({})
  });

  const localStorage = jasmine.createSpyObj('localStorage', ['setItem']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      providers: [
        UserManager,
        {
          provide: AuthenticationService,
          useValue: authnService
        },
        {
          provide: LocalStorageService,
          useValue: localStorage
        }
      ],
      declarations: [MainNavComponent, AuthCallbackComponent, SignoutCallbackComponent, PageNotFoundComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startAuthentication when signing in', () => {
    component.signin();
    expect(authnService.startAuthentication).toHaveBeenCalled();
  });

  it('should save a value to local storage when signing in', () => {
    component.signin();
    expect(localStorage.setItem).toHaveBeenCalledWith('path_redirect', 'home');
  });

  it('should call startSignout when signing in', () => {
    component.signout();
    expect(authnService.startSignout).toHaveBeenCalled();
  });

  it('should save a value to local storage when signing out', () => {
    component.signout();
    expect(localStorage.setItem).toHaveBeenCalledWith('path_redirect', 'home');
  });

});
