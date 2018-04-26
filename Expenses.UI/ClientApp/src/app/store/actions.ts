import { Action } from 'redux';
import { ExpensesSummary } from '../components/expenses/models/expenses-summary';

export interface FilterAction extends Action {
    filterDate: Date;
}

export interface StoreExpensesAction extends Action {
    expenseClaims: ExpensesSummary;
}
