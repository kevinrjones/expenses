import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { asyncData } from '../../../../testing/helpers';
import { AuthenticationService } from '../../services/authorization/authentication.service';
import { SignoutCallbackComponent } from './signout-callback.component';

describe('SignoutCallbackComponent', () => {
  let component: SignoutCallbackComponent;
  let fixture: ComponentFixture<SignoutCallbackComponent>;
  const authServiceStub = {
    isLoggedIn(): Observable<boolean> {
      return asyncData(true);
    },
    completeSignout() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignoutCallbackComponent],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
