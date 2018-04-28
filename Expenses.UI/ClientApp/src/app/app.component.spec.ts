import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'ng2-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { AddExpenseDetailsComponent } from './components/expenses/add-expense-details/add-expense-details.component';
import { ExpenseClaimFormComponent } from './components/expenses/expense-claim-form/expense-claim-form.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        ToastModule.forRoot()
      ],
      declarations: [
        ExpenseClaimFormComponent,
        AppComponent,
        PageNotFoundComponent,
        HomeComponent,
        ExpenseClaimsComponent,
        AddExpenseDetailsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
