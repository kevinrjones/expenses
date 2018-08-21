import { Action } from '@ngrx/store';
import { ExpensesSummary } from '../models/expenses-summary';

export enum ExpenseActionTypes {
  RequestAllExpenses = '[Expenses] Request All Expenses',
  RequestAllExpensesSuccess = '[Expenses] Request All Expenses Success',
  RequestAllExpensesFail = '[Expenses] Request All Expenses Fail',
  RequestSingleExpense = '[Expenses] Request Single Expense',
  RequestSingleExpenseSuccess = '[Expenses] Request Single Expense Success',
  RequestSingleExpenseFail = '[Expenses] Request Single Expense Fail',
  ClearCurrentExpense = '[Expenses] Clear Current Expense',
  InitializeCurrentExpense = '[Expenses] Initialize Current Expense',
  // RequestExpenseSuccess = '[Expenses] Request Expense Success',
  // RequestExpenseFail = '[Expenses] Request Expense Fail',
  AddExpense = '[Expenses] Add Expense',
  AddExpenseSuccess = '[Expenses] Add Expense Success',
  AddExpenseFail = '[Expenses] Add Expense Fail',
  UpdateExpense = '[Expenses] Update Expense',
  UpdateExpenseSuccess = '[Expenses] Update Expense Success',
  UpdateExpenseFail = '[Expenses] Update Expense Fail'
}

/* istanbul ignore next */
export class RequestAllExpenses implements Action {
  readonly type = ExpenseActionTypes.RequestAllExpenses;

  constructor() {}
}

/* istanbul ignore next */
export class RequestAllExpensesSuccess implements Action {
  readonly type = ExpenseActionTypes.RequestAllExpensesSuccess;

  constructor(public payload: ExpensesSummary) {}
}

/* istanbul ignore next */
export class RequestAllExpensesFailed implements Action {
  readonly type = ExpenseActionTypes.RequestAllExpensesFail;

  constructor(public payload: string) {}
}

/* istanbul ignore next */
export class RequestSingleExpense implements Action {
  readonly type = ExpenseActionTypes.RequestSingleExpense;

  constructor(public payload: number) {}
}

export class RequestSingleExpenseSuccess implements Action {
  readonly type = ExpenseActionTypes.RequestSingleExpenseSuccess;

  constructor(public payload: number) {}
}

export class RequestSingleExpenseFail implements Action {
  readonly type = ExpenseActionTypes.RequestSingleExpenseFail;

  constructor(public payload: string) {}
}

export class ClearCurrentExpense implements Action {
  readonly type = ExpenseActionTypes.ClearCurrentExpense;

  constructor() {}
}

export class InitializeCurrentExpense implements Action {
  readonly type = ExpenseActionTypes.InitializeCurrentExpense;

  constructor() {}
}

/* istanbul ignore next */
export type ExpenseActions =
  | RequestAllExpenses
  | RequestAllExpensesSuccess
  | RequestAllExpensesFailed
  | RequestSingleExpense
  | RequestSingleExpenseSuccess
  | RequestSingleExpenseFail
  | ClearCurrentExpense
  | InitializeCurrentExpense;
