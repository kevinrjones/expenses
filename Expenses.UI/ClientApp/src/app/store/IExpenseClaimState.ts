import { ExpensesSummary } from '../components/expenses/models/expenses-summary';

export interface IExpensesSummaryState {
    expenseClaims: ExpensesSummary;
    filteredExpenseClaims: ExpensesSummary;
}
