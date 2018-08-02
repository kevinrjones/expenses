import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../../store';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { asyncData } from '../../../../testing/helpers';
import { AppConfig } from '../../../shared/projectConfigShared';
import { ExpenseClaim } from '../../models/expense-claim';
import { ExpensesSummary } from '../../models/expenses-summary';
import { ExpenseClaimsService } from '../../services/expense-claims.service';
import { ExpenseActions } from '../../store/expense-actions';
import { ShowExpenseDetailsComponent } from './show-expense-details.component';


describe('ShowExpenseDetailsComponent', () => {
  let component: ShowExpenseDetailsComponent;
  let fixture: ComponentFixture<ShowExpenseDetailsComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
  let expenseActions: ExpenseActions;
  let storeStub: Subject<ExpensesSummary>;

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
          useValue: activatedRoute
        },
        {
          provide: ExpenseClaimsService,
          useValue: expenseClaimsServiceStub
        },
        {
          provide: ExpenseActions,
          useValue: jasmine.createSpyObj('expenseActions', ['getExpenseClaim'])
        },
        {
          provide: AppConfig,
          useValue: {}
        }
      ],
      imports: [NgReduxTestingModule],
      declarations: [ShowExpenseDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExpenseDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute);
    expenseActions = TestBed.get(ExpenseActions);
    storeStub = MockNgRedux.getSelectorStub<IAppState, ExpensesSummary>('expenseClaim');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // prettier-ignore
  it('should call the getExpenseClaim action when the route is activated', fakeAsync(() => {
    activatedRoute.setParamMap({id: 1});
    expect(expenseActions.getExpenseClaim).toHaveBeenCalled();
  }));

  it('should set the claim when the store event fires', fakeAsync(() => {
    expect(component.claim).toBeUndefined();
    component.id = 1;
    storeStub.next(new ExpensesSummary());
    expect(component.claim).not.toBeUndefined();
  }));
});
