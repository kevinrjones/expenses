import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ExpenseClaimFormComponent } from './expense-claim-form.component';
import { NgReduxTestingModule } from '@angular-redux/store/lib/testing';
import { ExpenseActions } from '../expense.actions';
import { ExpenseClaimsService } from '../expense-claims.service';
import { AppConfig } from '../../../shared/projectConfigShared';
import { ExpensesSummary } from '../models/expenses-summary';
import { asyncData } from '../../../testing/helpers';
import { ExpenseClaim } from '../models/expense-claim';
import { appRoutes } from '../../../app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../../home/home.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { ExpenseClaimsComponent } from '../expense-claims/expense-claims.component';
import { AddExpenseDetailsComponent } from '../add-expense-details/add-expense-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ExpenseClaimFormComponent', () => {
  let component: ExpenseClaimFormComponent;
  let fixture: ComponentFixture<ExpenseClaimFormComponent>;

  const claims = new Array<ExpenseClaim>(new ExpenseClaim({ description: 'A Description', id: 1, dueDateUtc: '20180417' }), new ExpenseClaim());

  const summary = new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' });

  beforeEach(
    async(() => {

      const expenseClaimsServiceStub = {
        claims(): Observable<ExpensesSummary> {
          return asyncData(summary);
        }
      };


      TestBed.configureTestingModule({
        providers: [
          {
            provide: ExpenseClaimsService,
            useValue: expenseClaimsServiceStub
          },
          {
            provide: AppConfig,
            useValue: {}
          },
          ExpenseActions
        ],
        imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(appRoutes), NgReduxTestingModule, NgbModule.forRoot()],
        declarations: [HomeComponent, ExpenseClaimFormComponent, ExpenseClaimsComponent, PageNotFoundComponent, AddExpenseDetailsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseClaimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
