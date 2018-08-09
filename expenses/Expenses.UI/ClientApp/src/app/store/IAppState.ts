import { ExpensesSummary } from "../modules/expenses/models/expenses-summary";
import { ErrorState } from "../modules/shared/ErrorState";

export interface IAppState {
    expenseClaims: ExpensesSummary;
    error: ErrorState;
}
