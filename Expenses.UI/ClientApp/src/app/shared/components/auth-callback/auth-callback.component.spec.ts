import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { asyncData } from '../../../testing/helpers';
import { AuthenticationService } from '../../services/authorization/authentication.service';
import { AuthCallbackComponent } from './auth-callback.component';

describe('AuthCallbackComponent', () => {
  let component: AuthCallbackComponent;
  let fixture: ComponentFixture<AuthCallbackComponent>;
  const authServiceStub = {
    isLoggedIn(): Observable<boolean> {
      return asyncData(true);
    },
    completeAuthentication() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthCallbackComponent],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
