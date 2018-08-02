import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { asyncData, asyncError } from '../../../testing/helpers';
import { LoggingService } from '../../shared/services/logging.service';
import { ExpenseClaimsService } from '../services/expense-claims.service';
import { ExpenseActions, FILTER_EXPENSES } from './expense-actions';

describe('ExpenseAction', () => {
  let expenseActions: ExpenseActions;
  let expenseClaimsService: ExpenseClaimsService;
  let logger: LoggingService;

  beforeEach(() => {
    logger = jasmine.createSpyObj('LoggingService', ['info']);
    expenseClaimsService = jasmine.createSpyObj('expenseClaimsService', {
      claim: asyncData({ id: 1 }),
      claims: asyncData({})
    });

    MockNgRedux.reset();
    TestBed.configureTestingModule({
      providers: [
        ExpenseActions,
        {
          provide: LoggingService,
          useValue: logger
        },
        {
          provide: ExpenseClaimsService,
          useValue: expenseClaimsService
        }
      ],
      imports: [NgReduxTestingModule]
    });
    expenseActions = TestBed.get(ExpenseActions);
    logger = TestBed.get(LoggingService);
  });

  it('should create', () => {
    expect(expenseActions).not.toBeNull();
  });

  describe('getExpenseSummary', () => {
    it('should call expensesClaimsService when called', () => {
      expenseActions.getExpenseSummary();
      expect(expenseClaimsService.claims).toHaveBeenCalled();
    });
  });

  describe('getExpenseClaim', () => {
    it('should call expensesClaimsService when called', () => {
      expenseActions.getExpenseClaim(1);
      expect(expenseClaimsService.claim).toHaveBeenCalled();
    });
  });
});

describe('ExpenseAction', () => {
  let expenseActions: ExpenseActions;
  let expenseClaimsService: ExpenseClaimsService;
  let logger: LoggingService;

  beforeEach(() => {
    logger = jasmine.createSpyObj('LoggingService', ['info']);
    expenseClaimsService = jasmine.createSpyObj('expenseClaimsService', {
      claim: asyncError({}),
      claims: asyncError({})
    });

    MockNgRedux.reset();
    TestBed.configureTestingModule({
      providers: [
        ExpenseActions,
        {
          provide: LoggingService,
          useValue: logger
        },
        {
          provide: ExpenseClaimsService,
          useValue: expenseClaimsService
        }
      ],
      imports: [NgReduxTestingModule]
    });
    expenseActions = TestBed.get(ExpenseActions);
    logger = TestBed.get(LoggingService);
  });

  describe('getExpenseSummary', () => {
    // orettier-ignore
    it('should call the logger when  the call fails', fakeAsync(() => {
        expenseActions.getExpenseSummary();
        tick();
        expect(logger.info).toHaveBeenCalled();
      })
    );
  });

  describe('getExpenseClaim', () => {
    // mprettier-ignore
    it('should call the logger when the call fails', fakeAsync(() => {
        expenseActions = TestBed.get(ExpenseActions);
        expenseActions.getExpenseClaim(1);
        tick();
        expect(logger.info).toHaveBeenCalled();
      })
    );
  });

  describe('filterExpenses', () => {
    it('should return the action with the corect action value',  () => {
      expenseActions = TestBed.get(ExpenseActions);
      const date = new Date();
      expect(expenseActions.filterExpenses(date).type).toBe(FILTER_EXPENSES);
    });

    it('should return the action with the date set',  () => {
      expenseActions = TestBed.get(ExpenseActions);
      const date = new Date();
      expect(expenseActions.filterExpenses(date).filterDate).toBe(date);
    });

  });
});
