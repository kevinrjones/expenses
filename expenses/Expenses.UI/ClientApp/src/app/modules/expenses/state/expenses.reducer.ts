import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import { ExpenseClaim } from '../models/expense-claim';
import { ExpensesSummary } from '../models/expenses-summary';
import { ExpenseActions, ExpenseActionTypes } from './expense.actions';

export interface ExpensesState {
  hasLoaded: boolean;
  expensesSummary: ExpensesSummary;
  currentExpenseId: number | null;
  error: string;
}

export interface State extends fromRoot.State {
  expenses: ExpensesState;
}

const initialState: ExpensesState = {
  hasLoaded: false,
  expensesSummary: new ExpensesSummary(),
  currentExpenseId: null,
  error: ''
};

const getExpensesState = createFeatureSelector<ExpensesState>('expenses');
export const getExpensesSummary = createSelector(getExpensesState, state => state.expensesSummary);
export const getHasLoaded = createSelector(getExpensesState, state => state.hasLoaded);
export const getCurrentExpenseClaimId = createSelector(getExpensesState, state => state.currentExpenseId);
export const getCurrentExpenseClaim = createSelector(getExpensesState, getCurrentExpenseClaimId, (state, currentExpenseId) => {
  if (currentExpenseId === 0) {
    return new ExpenseClaim();
  } else {
    return currentExpenseId ? state.expensesSummary.claims.find(e => e.id === currentExpenseId) : null;
  }
});
export const getError = createSelector(getExpensesState, state => state.error);

export function reducer(state = initialState, action: ExpenseActions): ExpensesState {
  switch (action.type) {
    case ExpenseActionTypes.RequestAllExpensesSuccess:
      return {
        ...state,
        hasLoaded: true,
        expensesSummary: action.payload,
        error: ''
      };
    case ExpenseActionTypes.RequestAllExpensesFail:
      return {
        ...state,
        error: action.payload
      };
    case ExpenseActionTypes.RequestSingleExpenseSuccess:
      return {
        ...state,
        currentExpenseId: action.payload
      };
    case ExpenseActionTypes.RequestSingleExpenseFail:
      return {
        ...state,
        error: action.payload
      };
    case ExpenseActionTypes.ClearCurrentExpense:
      return {
        ...state,
        currentExpenseId: null
      };
    case ExpenseActionTypes.InitializeCurrentExpense:
      return {
        ...state,
        currentExpenseId: 0
      };
    default:
      return state;
  }
}
