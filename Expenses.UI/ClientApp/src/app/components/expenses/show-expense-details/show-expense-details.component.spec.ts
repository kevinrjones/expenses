import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ShowExpenseDetailsComponent } from './show-expense-details.component';
import { AppConfig } from '../../../shared/projectConfigShared';
import { ExpenseActions } from '../expense.actions';
import { ExpenseClaimsService } from '../expense-claims.service';
import { ExpensesSummary } from '../models/expenses-summary';
import { ExpenseClaim } from '../models/expense-claim';
import { asyncData } from '../../../testing/helpers';
import { ActivatedRoute } from '@angular/router';

describe('ShowExpenseDetailsComponent', () => {
  let component: ShowExpenseDetailsComponent;
  let fixture: ComponentFixture<ShowExpenseDetailsComponent>;

  const claim = new ExpenseClaim();
  const claims = new Array<ExpenseClaim>(new ExpenseClaim({ description: 'A Description', id: 1, dueDateUtc: '20180417' }), new ExpenseClaim());

  const summary = new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' });

  beforeEach(async(() => {
    const expenseClaimsServiceStub = {
      claims(): Observable<ExpensesSummary> {
        return asyncData(summary);
      },
      claim(): Observable<ExpenseClaim> {
        return asyncData(claim);
      }
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: Observable.of({ get: (key) => '1' })
          }
        },
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
      imports: [NgReduxTestingModule],
      declarations: [ShowExpenseDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
