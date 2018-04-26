import { ExpenseClaim } from '../components/expenses/models/expense-claim';
import { IAppState } from './IAppState';
import { ExpensesSummary } from '../components/expenses/models/expenses-summary';
import { FILTER_EXPENSES, REQUEST_EXPENSES } from '../components/expenses/expense.actions';
import { Action } from 'redux';
import { FilterAction, StoreExpensesAction } from './actions';

const claims = [];

const initalExpenseClaimState: IAppState = {
  expenseClaims: new ExpensesSummary(),
  filteredExpenseClaims: new ExpensesSummary(),
};

function getFilteredExpenses(state: IAppState, filterDate: Date): IAppState {
    // todo: filter the expense details based on date
    return state;
}

function filterExpenses(state: IAppState, action: FilterAction): IAppState {
    return Object.assign({}, state,    {
        expenseClaims: new ExpensesSummary(state.expenseClaims),
        filteredExpenseClaims: getFilteredExpenses(state, action.filterDate)
    });
}

function storeExpenses(state: IAppState, action: StoreExpensesAction): IAppState {
    const data =  Object.assign({}, state, {
        expenseClaims: new ExpensesSummary(action.expenseClaims),
        filteredExpenseClaims: new ExpensesSummary(action.expenseClaims)
    });
    return data;
}

export function rootReducer(state: IAppState = initalExpenseClaimState, action: Action): IAppState {
  switch (action.type) {
    case FILTER_EXPENSES:
        return filterExpenses(state, action as FilterAction);
    case REQUEST_EXPENSES:
        return storeExpenses(state, action as StoreExpensesAction);
    case 'expenses/REQUEST_EXPENSES_FAIL':
        return state;
    default:
      return state;
  }
}
