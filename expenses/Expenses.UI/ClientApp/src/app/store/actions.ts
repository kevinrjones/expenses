import { Action } from 'redux';
import { ExpenseClaim } from '../modules/expenses/models/expense-claim';
import { ExpensesSummary } from '../modules/expenses/models/expenses-summary';
import { ErrorState } from '../modules/shared/ErrorState';

export interface FilterAction extends Action {
    filterDate: Date;
}

export interface StoreExpensesAction extends Action {
    expenseClaims: ExpensesSummary;
}

export interface RequestExpensesAction extends Action {
    id: number;
    expenseClaim: ExpenseClaim;
}

export interface RequestExpensesErrorAction extends Action {
    id: number;
    error: ErrorState;
}
