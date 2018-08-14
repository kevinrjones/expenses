import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { UserManager } from 'oidc-client';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './authentication/components/auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from './authentication/components/signout-callback/signout-callback.component';
import { AddExpenseDetailsComponent } from './expenses/components/add-expense-details/add-expense-details.component';
import { ExpenseClaimsComponent } from './expenses/components/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from './expenses/components/show-expense-details/show-expense-details.component';
import { HomeComponent } from './home/components/home/home.component';
import { appRoutes } from './router/app.routes';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        ToastrModule.forRoot()
      ],
      providers: [UserManager],
      declarations: [
        ShowExpenseDetailsComponent,
        AppComponent,
        PageNotFoundComponent,
        HomeComponent,
        ExpenseClaimsComponent,
        AddExpenseDetailsComponent,
        AuthCallbackComponent,
        SignoutCallbackComponent,
        MainNavComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
