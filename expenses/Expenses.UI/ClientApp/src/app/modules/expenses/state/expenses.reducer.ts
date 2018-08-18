import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import { ExpensesSummary } from '../models/expenses-summary';
import { ExpenseActions, ExpenseActionTypes } from './expense.actions';

export interface ExpensesState {
  expensesSummary: ExpensesSummary;
  error: string;
}

export interface State extends fromRoot.State {
  expenses: ExpensesState;
}

const initialState: ExpensesState = {
  expensesSummary: new ExpensesSummary(),
  error: ''
};

const getExpensesState = createFeatureSelector<ExpensesState>('expenses');
export const getExpensesSummary = createSelector(getExpensesState, state => state.expensesSummary);
export const getError = createSelector(getExpensesState, state => state.error);

export function reducer(state = initialState, action: ExpenseActions): ExpensesState {
  switch (action.type) {
      case ExpenseActionTypes.RequestExpensesSuccess:
      return {
        ...state,
        expensesSummary: action.payload,
        error: ''
      };
      case ExpenseActionTypes.RequestExpensesFail:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
