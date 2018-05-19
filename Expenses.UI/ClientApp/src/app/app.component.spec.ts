import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'ng2-toastr';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AddExpenseDetailsComponent } from './components/expenses/add-expense-details/add-expense-details.component';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { ShowExpenseDetailsComponent } from './components/expenses/show-expense-details/show-expense-details.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        ToastModule.forRoot()
      ],
      declarations: [
        ShowExpenseDetailsComponent,
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
