import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AddExpenseDetailsComponent } from './components/expenses/add-expense-details/add-expense-details.component';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from './components/expenses/show-expense-details/show-expense-details.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthCallbackComponent } from './shared/components/auth-callback/auth-callback.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        ToastrModule.forRoot()
      ],
      declarations: [
        ShowExpenseDetailsComponent,
        AppComponent,
        PageNotFoundComponent,
        HomeComponent,
        ExpenseClaimsComponent,
        AddExpenseDetailsComponent,
        AuthCallbackComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
