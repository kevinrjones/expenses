import { Action } from 'redux';
import { FILTER_EXPENSES, REQUEST_ERROR, REQUEST_EXPENSE, REQUEST_EXPENSES } from '../components/expenses/expense-actions';
import { ExpensesSummary } from '../components/expenses/models/expenses-summary';
import { ErrorState } from '../shared/ErrorState';
import { FilterAction, RequestExpensesAction, RequestExpensesErrorAction, StoreExpensesAction } from './actions';
import { IAppState } from './IAppState';

const claims = [];

const initalExpenseClaimState: IAppState = {
  expenseClaims: new ExpensesSummary(),
  error: new ErrorState()
};

function getFilteredExpenses(state: IAppState, filterDate: Date): IAppState {
  // todo: filter the expense details based on date
  return state;
}

function filterExpenses(state: IAppState, action: FilterAction): IAppState {
  return Object.assign({}, state, {
    expenseClaims: new ExpensesSummary(state.expenseClaims)
  });
}

function storeExpenses(state: IAppState, action: StoreExpensesAction): IAppState {
  const data = Object.assign({}, state, {
    expenseClaims: new ExpensesSummary(action.expenseClaims)
  });
  return data;
}

function requestExpense(state: IAppState, action: RequestExpensesAction): IAppState {
  const data = Object.assign({}, state, {
    expenseClaim: action.expenseClaim
  });
  return data;
}

function addError(state, action: RequestExpensesErrorAction): IAppState {
  const data = Object.assign({}, state, { error: action.error });
  return data;
}

export function rootReducer(state: IAppState = initalExpenseClaimState, action: Action): IAppState {
  switch (action.type) {
    case FILTER_EXPENSES:
      return filterExpenses(state, action as FilterAction);
    case REQUEST_EXPENSES:
      return storeExpenses(state, action as StoreExpensesAction);
    case REQUEST_EXPENSE:
      return requestExpense(state, action as RequestExpensesAction);
    case REQUEST_ERROR:
      // tslint:disable-next-line:no-debugger
      debugger;
      return addError(state, action as RequestExpensesErrorAction);
    default:
      return state;
  }
}
