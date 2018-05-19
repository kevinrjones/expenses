import { ExpensesSummary } from '../components/expenses/models/expenses-summary';
import { ErrorState } from '../shared/ErrorState';

export interface IAppState {
    expenseClaims: ExpensesSummary;
    error: ErrorState;
}
