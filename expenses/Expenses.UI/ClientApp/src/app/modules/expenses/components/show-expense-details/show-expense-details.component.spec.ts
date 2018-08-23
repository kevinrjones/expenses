import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import 'rxjs/add/observable/of';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { MockStore, provideMockStore } from '../../../../testing/helpers';
import { AppConfig } from '../../../shared/projectConfigShared';
import { ExpenseClaim } from '../../models/expense-claim';
import { ExpensesSummary } from '../../models/expenses-summary';
import { State } from '../../state/expenses.reducer';
import { ShowExpenseDetailsComponent } from './show-expense-details.component';

describe('ShowExpenseDetailsComponent', () => {
  let component: ShowExpenseDetailsComponent;
  let fixture: ComponentFixture<ShowExpenseDetailsComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  const claim = new ExpenseClaim();
  const claims = new Array<ExpenseClaim>(
    new ExpenseClaim({ description: 'A Description', id: 1, dueDateUtc: '20180417' }),
    new ExpenseClaim()
  );

  const summary = new ExpensesSummary({ totalClaimed: 200, totalPaid: 100, claims: claims, currency: '$' });
  let store: MockStore<State>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        },
        {
          provide: AppConfig,
          useValue: {}
        },
        provideMockStore()
      ],
      imports: [StoreModule.forRoot({})],
      declarations: [ShowExpenseDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExpenseDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute);

    store = TestBed.get(Store);
  });

  it('should create', () => {
    store.setState({
        expenses: {
          expensesSummary: summary,
          error: '',
          hasLoaded: false,
          currentExpenseId: null
        }
      });
    expect(component).toBeTruthy();
  });

  // prettier-ignore
  it('should call the dispatch the RequestSingleExpense action when the route is activated', fakeAsync(() => {

    store.setState({
        expenses: {
          expensesSummary: summary,
          error: '',
          hasLoaded: false,
          currentExpenseId: null
        }
      });

    fixture.detectChanges();
    const dispatchSpy = spyOn(store, 'dispatch');
    activatedRoute.setParamMap({id: 1});
    expect(store.dispatch).toHaveBeenCalled();
  }));

});
