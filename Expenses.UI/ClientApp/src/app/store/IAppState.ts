import { ExpensesSummary } from '../components/expenses/models/expenses-summary';

export interface IAppState {
    expenseClaims: ExpensesSummary;
    filteredExpenseClaims: ExpensesSummary;
}
